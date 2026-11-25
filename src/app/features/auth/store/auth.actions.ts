import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  AuthResponse,
  ConfirmEmailVerificationPayload,
  LoginPayload,
} from '../../../core/models/auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ payload: LoginPayload }>(),
    'Login Success': props<{ response: AuthResponse }>(),
    'Login Failure': props<{ error: string }>(),

    'Send Verification': props<{ email: string; navigate?: boolean }>(),
    'Send Verification Success': props<{ email: string; navigate?: boolean }>(),
    'Send Verification Failure': props<{ error: string }>(),

    'Confirm Verification': props<{ payload: ConfirmEmailVerificationPayload }>(),
    'Confirm Verification Success': emptyProps(),
    'Confirm Verification Failure': props<{ error: string }>(),

    'Save User Info': props<{
      firstName: string;
      lastName: string;
      username: string;
      phone: string;
    }>(),

    Register: props<{ password: string; confirmPassword: string }>(),
    'Register Success': props<{ response: AuthResponse }>(),
    'Register Failure': props<{ error: string }>(),

    'Forgot Password': props<{ email: string }>(),
    'Forgot Password Success': props<{ email: string }>(),
    'Forgot Password Failure': props<{ error: string }>(),

    'Reset Password': props<{
      token: string;
      newPassword: string;
      confirmPassword: string;
    }>(),
    'Reset Password Success': emptyProps(),
    'Reset Password Failure': props<{ error: string }>(),

    'Clear Error': emptyProps(),
    Logout: emptyProps(),
  },
});
