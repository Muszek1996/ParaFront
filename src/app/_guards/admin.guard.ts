import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.role === 'admin') {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/noaccess'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  isAdmin() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.role === 'admin') {
      // logged in so return true
      return true;
    }
    return false;
  }
}
