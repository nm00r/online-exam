import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AuthResponse,
  ConfirmEmailVerificationPayload,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  MessageResponse,
  RegisterPayload,
  SendEmailVerificationResponse,
} from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload);
  }

  sendEmailVerification(email: string): Observable<SendEmailVerificationResponse> {
    return this.http.post<SendEmailVerificationResponse>(`${this.baseUrl}/send-email-verification`, { email });
  }

  confirmEmailVerification(payload: ConfirmEmailVerificationPayload): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.baseUrl}/confirm-email-verification`, payload);
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, payload);
  }

  forgotPassword(payload: ForgotPasswordPayload): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(`${this.baseUrl}/forgot-password`, payload);
  }

  resetPassword(payload: { token: string; newPassword: string; confirmPassword: string }): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.baseUrl}/reset-password`, payload);
  }
}
