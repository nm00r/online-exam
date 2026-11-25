import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { AuthActions } from '../store/auth.actions';
import { authFeature } from '../store/auth.reducer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PasswordInputComponent, AlertComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  readonly loading = this.store.selectSignal(authFeature.selectLoading);
  readonly error = this.store.selectSignal(authFeature.selectError);
  readonly submitted = signal(false);

  readonly form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearError());
  }

  get username() { return this.form.controls.username; }
  get password() { return this.form.controls.password; }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;

    this.store.dispatch(AuthActions.login({ payload: this.form.getRawValue() }));
  }
}
