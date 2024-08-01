import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user-service.service';

@Component({
  selector: 'app-approvisionnement',
  templateUrl: './approvisionnement.component.html',
  styleUrls: ['./approvisionnement.component.scss'],
})
export class ApprovisionnementComponent {
  activContainer: string | null = null;
  isRotated = false;
  currentUser: any;
  currentUserName: string | undefined;
  firstLetter: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.currentUserName = user.firstName;
      this.getFirstLetter();
    });
  }

  showActiveContainer(container: string) {
    this.activContainer = container;
  }
  getFirstLetter() {
    if (this.currentUserName) {
      this.firstLetter = this.currentUserName.charAt(0);
    }
  }

  rotateElement() {
    this.isRotated = !this.isRotated;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/connexion']);
  }
}
