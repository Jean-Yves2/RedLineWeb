import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commercial-service',
  templateUrl: './commercial-service.component.html',
  styleUrls: ['./commercial-service.component.scss'],
})
export class CommercialServiceComponent {
  currentUser: any;
  currentUserName: string | undefined;
  firstLetter: string | undefined;
  isRotated = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.currentUserName = user.firstName;
      this.getFirstLetter();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/connexion']);
  }

  getFirstLetter() {
    if (this.currentUserName) {
      this.firstLetter = this.currentUserName.charAt(0);
    }
  }

  rotateElement() {
    this.isRotated = !this.isRotated;
  }
}
