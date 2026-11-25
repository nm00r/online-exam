import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { AuthActions } from '../../store/auth.actions';
import { authFeature } from '../../store/auth.reducer';

@Component({
  selector: 'app-register-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LucideAngularModule, AlertComponent],
  templateUrl: './register-email.component.html',
})
export class RegisterEmailComponent implements OnInit, AfterViewInit {
  @ViewChild('emailInput') emailInput?: ElementRef<HTMLInputElement>;

  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  readonly ChevronRight = ChevronRight;
  readonly loading = this.store.selectSignal(authFeature.selectLoading);
  readonly error = this.store.selectSignal(authFeature.selectError);
  readonly draft = this.store.selectSignal(authFeature.selectRegisterDraft);
  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearError());
    const savedEmail = this.draft().email;
    if (savedEmail) {
      this.form.patchValue({ email: savedEmail });
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.route.snapshot.queryParamMap.get('focusEmail')) {
      setTimeout(() => this.emailInput?.nativeElement.focus());
    }
  }

  get email() { return this.form.controls.email; }

  onNext(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;

    this.store.dispatch(
      AuthActions.sendVerification({ email: this.email.value, navigate: true })
    );
  }
}
