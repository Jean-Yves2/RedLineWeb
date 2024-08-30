import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const allowedRoles = next.data['roles'] as Array<string>;
    const currentUser = this.authService.currentUserValue;

    if (currentUser && allowedRoles.includes(currentUser.role)) {
      return true;
    } else {
      this.router.navigate(['/404']);
      return false;
    }
  }
}
