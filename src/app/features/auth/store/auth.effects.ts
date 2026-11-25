import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { AuthActions } from './auth.actions';
import { authFeature } from './auth.reducer';

function extractErrorMessage(err: unknown, fallback = 'Something went wrong'): string {
  if (err instanceof HttpErrorResponse) {
    return err.error?.message || err.error?.error || fallback;
  }
  return fallback;
}

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    platformId = inject(PLATFORM_ID)
  ) =>
    actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ payload }) =>
        authService.login(payload).pipe(
          tap((response) => {
            if (isPlatformBrowser(platformId)) {
              localStorage.setItem('token', response.token);
            }
          }),
          map((response) => AuthActions.loginSuccess({ response })),
          catchError((err) =>
            of(AuthActions.loginFailure({ error: extractErrorMessage(err) }))
          )
        )
      )
    ),
  { functional: true }
);

export const sendVerificationEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(AuthActions.sendVerification),
      switchMap(({ email, navigate }) =>
        authService.sendEmailVerification(email).pipe(
          map(() => AuthActions.sendVerificationSuccess({ email, navigate })),
          catchError((err) =>
            of(AuthActions.sendVerificationFailure({ error: extractErrorMessage(err) }))
          )
        )
      )
    ),
  { functional: true }
);

export const sendVerificationSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.sendVerificationSuccess),
      tap(({ navigate }) => {
        if (navigate !== false) {
          router.navigate(['/auth/register/verify-otp']);
        }
      })
    ),
  { functional: true, dispatch: false }
);

export const confirmVerificationEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(AuthActions.confirmVerification),
      switchMap(({ payload }) =>
        authService.confirmEmailVerification(payload).pipe(
          map(() => AuthActions.confirmVerificationSuccess()),
          catchError((err) =>
            of(AuthActions.confirmVerificationFailure({ error: extractErrorMessage(err) }))
          )
        )
      )
    ),
  { functional: true }
);

export const confirmVerificationSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.confirmVerificationSuccess),
      tap(() => router.navigate(['/auth/register/user-info']))
    ),
  { functional: true, dispatch: false }
);

export const saveUserInfoEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.saveUserInfo),
      tap(() => router.navigate(['/auth/register/password']))
    ),
  { functional: true, dispatch: false }
);

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    store = inject(Store),
    platformId = inject(PLATFORM_ID)
  ) =>
    actions$.pipe(
      ofType(AuthActions.register),
      withLatestFrom(store.select(authFeature.selectRegisterDraft)),
      switchMap(([{ password, confirmPassword }, draft]) =>
        authService
          .register({
            ...draft,
            password,
            confirmPassword,
          })
          .pipe(
            tap((response) => {
              if (isPlatformBrowser(platformId)) {
                localStorage.setItem('token', response.token);
              }
            }),
            map((response) => AuthActions.registerSuccess({ response })),
            catchError((err) =>
              of(AuthActions.registerFailure({ error: extractErrorMessage(err) }))
            )
          )
      )
    ),
  { functional: true }
);

export const registerSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.registerSuccess),
      tap(() => router.navigate(['/auth/login']))
    ),
  { functional: true, dispatch: false }
);

export const forgotPasswordEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    platformId = inject(PLATFORM_ID)
  ) =>
    actions$.pipe(
      ofType(AuthActions.forgotPassword),
      switchMap(({ email }) => {
        const redirectUrl = isPlatformBrowser(platformId)
          ? `${window.location.origin}/auth/reset-password`
          : '';
        return authService.forgotPassword({ email, redirectUrl }).pipe(
          map(() => AuthActions.forgotPasswordSuccess({ email })),
          catchError((err) =>
            of(AuthActions.forgotPasswordFailure({ error: extractErrorMessage(err) }))
          )
        );
      })
    ),
  { functional: true }
);

export const forgotPasswordSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.forgotPasswordSuccess),
      tap(({ email }) =>
        router.navigate(['/auth/forgot-password/sent'], {
          queryParams: { email },
        })
      )
    ),
  { functional: true, dispatch: false }
);

export const resetPasswordEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(AuthActions.resetPassword),
      switchMap((payload) =>
        authService.resetPassword(payload).pipe(
          map(() => AuthActions.resetPasswordSuccess()),
          catchError((err) =>
            of(AuthActions.resetPasswordFailure({ error: extractErrorMessage(err) }))
          )
        )
      )
    ),
  { functional: true }
);

export const resetPasswordSuccessEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.resetPasswordSuccess),
      tap(() => router.navigate(['/auth/login']))
    ),
  { functional: true, dispatch: false }
);
