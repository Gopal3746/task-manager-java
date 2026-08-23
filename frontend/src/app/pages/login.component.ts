import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="card">
      <h2>Login</h2>
      <form (ngSubmit)="submit()">
        <label>Username</label>
        <input name="username" [(ngModel)]="username" required />

        <label>Password</label>
        <input name="password" [(ngModel)]="password" type="password" required />

        @if (error) { <div class="error">{{ error }}</div> }
        <button type="submit">Login</button>
      </form>
      <p>Need an account? <a routerLink="/register">Register</a></p>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    this.error = '';
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigateByUrl('/tasks'),
      error: () => this.error = 'Login failed. Check your username and password.'
    });
  }
}
