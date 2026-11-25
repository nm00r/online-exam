import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'forgot-password',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/auth/forgot-password/forgot-password.component').then(
                m => m.ForgotPasswordComponent
              ),
          },
          {
            path: 'sent',
            loadComponent: () =>
              import('./features/auth/forgot-password/password-reset-sent/password-reset-sent.component').then(
                m => m.PasswordResetSentComponent
              ),
          },
        ],
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./features/auth/reset-password/reset-password.component').then(
            m => m.ResetPasswordComponent
          ),
      },
      {
        path: 'register',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/auth/register/register-email/register-email.component').then(
                m => m.RegisterEmailComponent
              ),
          },
          {
            path: 'verify-otp',
            loadComponent: () =>
              import('./features/auth/register/register-otp/register-otp.component').then(
                m => m.RegisterOtpComponent
              ),
          },
          {
            path: 'user-info',
            loadComponent: () =>
              import('./features/auth/register/register-user-info/register-user-info.component').then(
                m => m.RegisterUserInfoComponent
              ),
          },
          {
            path: 'password',
            loadComponent: () =>
              import('./features/auth/register/register-password/register-password.component').then(
                m => m.RegisterPasswordComponent
              ),
          },
        ],
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login' },
];
