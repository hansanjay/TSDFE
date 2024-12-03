import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  
  login(email: string, password: string): boolean {
    // Simple check for demonstration purposes

    if (email === 'test@abc.com' && password === 'test@123') {
      localStorage.setItem('user', JSON.stringify({ email }));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
  checkAuth(): boolean {
    return !!localStorage.getItem('user');
  }
}
