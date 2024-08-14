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
  filteredUsers: any[] = [];
  paginatedUsers: any[] = [];
  currentPage = 1;
  totalPages = 1;
  pageSize = 11;
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';
  activContainer: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.currentUserName = user.firstName;
      this.getFirstLetter();
    });
  }

  ngOnInit() {
    this.fetchUsers();
    this.showActiveContainer('Clients');
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = this.users;
        this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
        this.setPage(this.currentPage);
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      },
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

  sortUsers() {
    this.filteredUsers.sort((a, b) => {
      const nameA = a.firstName.toLowerCase();
      const nameB = b.firstName.toLowerCase();
      if (nameA < nameB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    this.setPage(this.currentPage);
  }

  filterUsers() {
    this.filteredUsers = this.users.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase()),
    );
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.setPage(1);
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortUsers();
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.filteredUsers.length,
    );
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.setPage(page);
  }

  showActiveContainer(container: string) {
    this.activContainer = container;
  }
}
