import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent {
  currentUser: any;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  isCommercial(): boolean {
    return this.currentUser?.user.role === 'INTERNAL_USER';
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/connexion']);
  }
}
