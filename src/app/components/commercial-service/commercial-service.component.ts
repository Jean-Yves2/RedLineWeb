import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user-service.service';
import { CommercialService } from '../../services/commercial/commercial.service';

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
  pageSize = 9;
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';
  activContainer: string | null = null;
  myProfil: any;

  selectedClient: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private commercialService: CommercialService
  ) {}

  ngOnInit() {
    // Initialiser l'utilisateur courant
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.currentUserName = user.firstName;
      this.getFirstLetter();
    });

    // Charger les clients ou devis en fonction de la section active
    this.showActiveContainer('Devis'); // Par défaut afficher Clients
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = this.users;
        this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
        this.setPage(this.currentPage);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      },
    });
  }

  fetchMyProfile() {
    this.userService.getMyProfile().subscribe({
      next: (data) => {
        this.myProfil = data;
        console.log('Mon profil : ', this.myProfil);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de mon profil', error);
      },
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
        .includes(this.searchTerm.toLowerCase())
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
      this.filteredUsers.length
    );
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.setPage(page);
  }

  showActiveContainer(container: string) {
    this.activContainer = container;

    // Charger les données en fonction de la section active
    if (container === 'Clients' && !this.users.length) {
      this.fetchUsers();
    } else if (container === 'Profil' && !this.myProfil) {
      this.fetchMyProfile();
    }
  }

  setSelectedClient(client: any) {
    localStorage.setItem('selectedClient', JSON.stringify(client));
    this.updateClient();
  }

  getSelectedClient() {
    return JSON.parse(localStorage.getItem('selectedClient') || '{}');
  }

  updateClient() {
    this.selectedClient = this.getSelectedClient();
    console.log('Client sélectionné updated : ', this.selectedClient);
    console.log('Client sélectionné updated id : ', this.selectedClient.id);
  }
}
