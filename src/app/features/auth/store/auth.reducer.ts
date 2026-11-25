import { createFeature, createReducer, on } from '@ngrx/store';
import { RegisterDraft, User } from '../../../core/models/auth.model';
import { AuthActions } from './auth.actions';

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  emailVerified: boolean;
  registerDraft: RegisterDraft;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  emailVerified: false,
  registerDraft: {
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
  },
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,

    on(AuthActions.clearError, (state) => ({
      ...state,
      error: null,
    })),

    on(AuthActions.login, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(AuthActions.loginSuccess, (state, { response }) => ({
      ...state,
      loading: false,
      user: response.user,
      token: response.token,
      error: null,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(AuthActions.sendVerification, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(AuthActions.sendVerificationSuccess, (state, { email }) => ({
      ...state,
      loading: false,
      error: null,
      registerDraft: {
        ...state.registerDraft,
        email,
      },
    })),
    on(AuthActions.sendVerificationFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(AuthActions.confirmVerification, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(AuthActions.confirmVerificationSuccess, (state) => ({
      ...state,
      loading: false,
      emailVerified: true,
      error: null,
    })),
    on(AuthActions.confirmVerificationFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(AuthActions.saveUserInfo, (state, { firstName, lastName, username, phone }) => ({
      ...state,
      error: null,
      registerDraft: {
        ...state.registerDraft,
        firstName,
        lastName,
        username,
        phone,
      },
    })),

    on(AuthActions.register, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(AuthActions.registerSuccess, (state, { response }) => ({
      ...state,
      loading: false,
      user: response.user,
      token: response.token,
      error: null,
    })),
    on(AuthActions.registerFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(AuthActions.forgotPassword, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(AuthActions.forgotPasswordSuccess, (state) => ({
      ...state,
      loading: false,
      error: null,
    })),
    on(AuthActions.forgotPasswordFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(AuthActions.resetPassword, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(AuthActions.resetPasswordSuccess, (state) => ({
      ...state,
      loading: false,
      error: null,
    })),
    on(AuthActions.resetPasswordFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(AuthActions.logout, () => initialState)
  ),
});
