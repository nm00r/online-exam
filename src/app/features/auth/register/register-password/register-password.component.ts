import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { PasswordInputComponent } from '../../../../shared/components/password-input/password-input.component';
import { StepperComponent } from '../../../../shared/components/stepper/stepper.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { AuthActions } from '../../store/auth.actions';
import { authFeature } from '../../store/auth.reducer';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pw && confirm && pw !== confirm ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PasswordInputComponent, StepperComponent, AlertComponent],
  templateUrl: './register-password.component.html',
})
export class RegisterPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly loading = this.store.selectSignal(authFeature.selectLoading);
  readonly error = this.store.selectSignal(authFeature.selectError);
  readonly draft = this.store.selectSignal(authFeature.selectRegisterDraft);
  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group(
    {
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator }
  );

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearError());
    if (!this.draft().email || !this.draft().username) {
      this.router.navigate(['/auth/register']);
    }
  }

  get password() { return this.form.controls.password; }
  get confirmPassword() { return this.form.controls.confirmPassword; }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;

    const { password, confirmPassword } = this.form.getRawValue();
    this.store.dispatch(AuthActions.register({ password, confirmPassword }));
  }
}
