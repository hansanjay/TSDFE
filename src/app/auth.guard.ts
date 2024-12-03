import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userData: any;
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(private authService: AuthService, private router: Router) {
    this.userData = localStorage.getItem('user')
    this.userData = JSON.parse(this.userData );
  }

  canActivate(): boolean {
    if (this.authService.checkAuth()) {
      if(this.userData){
        // this.router.navigate(['/dashboard'])
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
