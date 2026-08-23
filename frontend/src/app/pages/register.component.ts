import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="card">
      <h2>Register</h2>
      <form (ngSubmit)="submit()">
        <label>Username</label>
        <input name="username" [(ngModel)]="username" minlength="3" required />

        <label>Password</label>
        <input name="password" [(ngModel)]="password" type="password" minlength="6" required />

        @if (error) { <div class="error">{{ error }}</div> }
        <button type="submit">Create account</button>
      </form>
      <p>Already registered? <a routerLink="/login">Login</a></p>
    </div>
  `
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    this.error = '';
    this.auth.register(this.username, this.password).subscribe({
      next: () => this.router.navigateByUrl('/tasks'),
      error: () => this.error = 'Registration failed. Try a different username.'
    });
  }
}
