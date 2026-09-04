import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

const VALID_LOGIN = 'test';
const VALID_PASSWORD = 'Test1234';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storage = inject(StorageService);
  private router = inject(Router);
  private loggedIn = signal<boolean>(this.storage.getAuth());

  readonly isAuthenticated = this.loggedIn.asReadonly();

  login(username: string, password: string): boolean {
    if (username === VALID_LOGIN && password === VALID_PASSWORD) {
      this.loggedIn.set(true);
      this.storage.setAuth(true);
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn.set(false);
    this.storage.setAuth(false);
    this.router.navigate(['/login']);
  }
}
