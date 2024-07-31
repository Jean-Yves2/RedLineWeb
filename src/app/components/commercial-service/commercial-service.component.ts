import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user-service.service';

@Component({
  selector: 'app-commercial-service',
  templateUrl: './commercial-service.component.html',
  styleUrls: ['./commercial-service.component.scss'],
})
export class CommercialServiceComponent implements OnInit {
  currentUser: any;
  currentUserName: string | undefined;
  firstLetter: string | undefined;
  isRotated = false;
  users: any[] = [];

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

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
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
