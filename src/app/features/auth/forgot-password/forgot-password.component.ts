import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { AuthActions } from '../store/auth.actions';
import { authFeature } from '../store/auth.reducer';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LucideAngularModule, AlertComponent],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  readonly ChevronRight = ChevronRight;
  readonly loading = this.store.selectSignal(authFeature.selectLoading);
  readonly error = this.store.selectSignal(authFeature.selectError);
  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearError());
  }

  get email() { return this.form.controls.email; }

  onNext(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;

    this.store.dispatch(AuthActions.forgotPassword({ email: this.email.value }));
  }
}
