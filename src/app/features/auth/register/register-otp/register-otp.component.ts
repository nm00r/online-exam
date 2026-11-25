import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { StepperComponent } from '../../../../shared/components/stepper/stepper.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { AuthActions } from '../../store/auth.actions';
import { authFeature } from '../../store/auth.reducer';

@Component({
  selector: 'app-register-otp',
  standalone: true,
  imports: [CommonModule, RouterModule, StepperComponent, AlertComponent],
  templateUrl: './register-otp.component.html',
})
export class RegisterOtpComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly loading = this.store.selectSignal(authFeature.selectLoading);
  readonly error = this.store.selectSignal(authFeature.selectError);
  readonly draft = this.store.selectSignal(authFeature.selectRegisterDraft);
  readonly email = computed(() => this.draft().email || 'user@example.com');

  readonly otp = signal<string[]>(['', '', '', '', '', '']);
  readonly resendSeconds = signal(60);
  readonly localError = signal('');

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearError());
    if (!this.draft().email) {
      this.router.navigate(['/auth/register']);
      return;
    }
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  startTimer(): void {
    clearInterval(this.timer);
    this.resendSeconds.set(60);
    this.timer = setInterval(() => {
      if (this.resendSeconds() > 0) {
        this.resendSeconds.update((s) => s - 1);
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onKeyUp(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    const val = input.value;
    const nextOtp = [...this.otp()];
    nextOtp[index] = val.slice(-1);
    this.otp.set(nextOtp);
    this.localError.set('');

    if (val && index < 5) {
      document.getElementById('otp-' + (index + 1))?.focus();
    } else if (event.key === 'Backspace' && !val && index > 0) {
      document.getElementById('otp-' + (index - 1))?.focus();
    }
  }

  onVerify(): void {
    const code = this.otp().join('');
    if (code.length < 6) {
      this.localError.set('Please enter all 6 digits');
      return;
    }

    this.store.dispatch(
      AuthActions.confirmVerification({
        payload: { email: this.email(), code },
      })
    );
  }

  resend(): void {
    if (this.resendSeconds() > 0) return;
    this.startTimer();
    this.store.dispatch(
      AuthActions.sendVerification({ email: this.email(), navigate: false })
    );
  }
}
