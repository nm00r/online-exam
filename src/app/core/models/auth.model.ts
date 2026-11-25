export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface SendEmailVerificationResponse {
  message: string;
  code?: string;
}

export interface ConfirmEmailVerificationPayload {
  email: string;
  code: string;
}

export interface MessageResponse {
  message: string;
}

export interface ForgotPasswordPayload {
  email: string;
  redirectUrl: string;
}

export interface ForgotPasswordResponse {
  message: string;
  resetToken?: string;
}

export interface RegisterDraft {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
}
