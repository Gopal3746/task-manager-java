import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

interface AuthResponse {
  token: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = 'http://localhost:8080/api/auth';
  private readonly tokenKey = 'task_tracker_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<AuthResponse>(`${this.api}/login`, { username, password })
      .pipe(tap(response => localStorage.setItem(this.tokenKey, response.token)));
  }

  register(username: string, password: string) {
    return this.http.post<AuthResponse>(`${this.api}/register`, { username, password })
      .pipe(tap(response => localStorage.setItem(this.tokenKey, response.token)));
  }

  token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.token();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
