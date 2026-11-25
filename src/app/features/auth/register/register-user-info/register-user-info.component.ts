import { Component, ElementRef, HostListener, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LucideAngularModule, ChevronRight, ChevronsUpDown } from 'lucide-angular';
import { allCountries, CountryData } from 'country-telephone-data';
import { StepperComponent } from '../../../../shared/components/stepper/stepper.component';
import { AuthActions } from '../../store/auth.actions';
import { authFeature } from '../../store/auth.reducer';

const EGYPT_DEFAULT: CountryData =
  allCountries.find((c) => c.iso2 === 'eg') ?? {
    name: 'Egypt',
    iso2: 'eg',
    dialCode: '20',
    priority: 0,
  };

@Component({
  selector: 'app-register-user-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LucideAngularModule, StepperComponent],
  templateUrl: './register-user-info.component.html',
})
export class RegisterUserInfoComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);

  readonly ChevronRight = ChevronRight;
  readonly ChevronsUpDown = ChevronsUpDown;
  readonly draft = this.store.selectSignal(authFeature.selectRegisterDraft);
  readonly submitted = signal(false);

  readonly countries = allCountries;
  readonly selectedCountry = signal<CountryData>(EGYPT_DEFAULT);
  readonly dropdownOpen = signal(false);
  readonly searchQuery = signal('');

  readonly filteredCountries = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.countries;
    return this.countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso2.toLowerCase().includes(q) ||
        c.dialCode.includes(q)
    );
  });

  readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    phone: [''],
  });

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.dropdownOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownOpen.set(false);
    }
  }

  ngOnInit(): void {
    const { email, firstName, lastName, username, phone } = this.draft();
    if (!email) {
      this.router.navigate(['/auth/register']);
      return;
    }

    let localPhone = phone;
    const dialPrefix = `+${this.selectedCountry().dialCode}`;
    if (localPhone.startsWith(dialPrefix)) {
      localPhone = localPhone.slice(dialPrefix.length);
    }

    this.form.patchValue({ firstName, lastName, username, phone: localPhone });
  }

  get firstName() { return this.form.controls.firstName; }
  get lastName() { return this.form.controls.lastName; }
  get username() { return this.form.controls.username; }

  toggleDropdown(): void {
    this.dropdownOpen.update((open) => !open);
    if (!this.dropdownOpen()) {
      this.searchQuery.set('');
    }
  }

  selectCountry(country: CountryData): void {
    this.selectedCountry.set(country);
    this.dropdownOpen.set(false);
    this.searchQuery.set('');
  }

  onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  onNext(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();
    const trimmedPhone = raw.phone.trim();
    const formattedPhone = trimmedPhone ? `+${this.selectedCountry().dialCode}${trimmedPhone}` : '';

    this.store.dispatch(
      AuthActions.saveUserInfo({
        firstName: raw.firstName,
        lastName: raw.lastName,
        username: raw.username,
        phone: formattedPhone,
      })
    );
  }
}
