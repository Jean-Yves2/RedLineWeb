import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user-service.service';
import { FournisseurService } from '../../services/fournisseur/fournisseur.service';

@Component({
  selector: 'app-approvisionnement',
  templateUrl: './approvisionnement.component.html',
  styleUrls: ['./approvisionnement.component.scss'],
})
export class ApprovisionnementComponent implements OnInit {
  activContainer: string | null = null;
  isRotated = false;
  currentUser: any;
  currentUserName: string | undefined;
  firstLetter: string | undefined;

  allSuppliers: any[] = [];
  activeSuppliers: any[] = [];
  inactiveSuppliers: any[] = [];

  paginatedActiveSupplier: any[] = [];
  currentPage = 1;
  totalPages = 1;
  pageSize = 6;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private fournisseurService: FournisseurService
  ) {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.currentUserName = user.firstName;
      this.getFirstLetter();
    });
  }

  ngOnInit() {
    this.showActiveContainer('Stocks');
    this.fetchSuppliers()
      .then(() => {
        return this.getActiveSuppliers();
      })
      .then(() => {
        this.setPage(this.currentPage);
      })
      .then(() => {
        console.log('Fournisseurs actifs', this.activeSuppliers);
        return this.getInactiveSuppliers();
      })
      .then(() => {
        console.log('Fournisseurs inactifs', this.inactiveSuppliers);
      })
      .catch((error: any) => {
        console.error('Error fetching suppliers', error);
      });
  }

  fetchSuppliers(): Promise<void> {
    return this.fournisseurService
      .getFournisseurs()
      .toPromise()
      .then((suppliers) => {
        this.allSuppliers = suppliers;

        console.log('Tous les fournisseurs', suppliers);
      });
  }

  getActiveSuppliers(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fournisseurService.getFournisseurs().subscribe({
        next: (suppliers) => {
          this.activeSuppliers = suppliers.filter(
            (supplier: { deletedAt: any }) => !supplier.deletedAt
          );
          resolve();
        },
        error: (err) => reject(err),
      });
    });
  }

  getInactiveSuppliers(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fournisseurService.getFournisseurs().subscribe({
        next: (suppliers) => {
          this.inactiveSuppliers = suppliers.filter(
            (supplier: { deletedAt: any }) => supplier.deletedAt
          );
          resolve();
        },
        error: (err) => reject(err),
      });
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

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.totalPages = Math.ceil(this.activeSuppliers.length / this.pageSize);
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.activeSuppliers.length
    );
    this.paginatedActiveSupplier = this.activeSuppliers.slice(
      startIndex,
      endIndex
    );
  }

  goToPage(page: number) {
    this.setPage(page);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('fr-FR', options);
  }

  //  Stocks management
}
