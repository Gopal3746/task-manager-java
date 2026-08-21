import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="container">
      <div class="row card">
        <strong>Task Tracker</strong>
        <span class="spacer"></span>
        @if (auth.isLoggedIn()) {
          <a routerLink="/tasks">Tasks</a>
          <button class="secondary" (click)="logout()">Log out</button>
        } @else {
          <a routerLink="/login">Login</a>
          <a routerLink="/register">Register</a>
        }
      </div>
      <router-outlet />
    </div>
  `
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
