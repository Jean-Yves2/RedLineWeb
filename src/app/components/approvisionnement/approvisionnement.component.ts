import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user-service.service';
import { FournisseurService } from '../../services/fournisseur/fournisseur.service';
import { EntrepotService } from '../../services/entrepot/entrepot.service';
import { NgForm } from '@angular/forms';
import { SupplyService } from '../../services/supply/supply.service';

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

  /* Suppliers */

  allSuppliers: any[] = [];
  activeSuppliers: any[] = [];
  inactiveSuppliers: any[] = [];

  /* Pagination */

  paginatedActiveSupplier: any[] = [];
  currentPage = 1;
  totalPages = 1;
  pageSize = 6;

  /* Warehouses */

  allWarehouse: any[] = [];

  // Modal

  isModalOpen = true; // true juste pour les tests
  newSupplier = {
    name: '',
    email: '',
    siret: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private entrepotService: EntrepotService,
    private supplyService: SupplyService
  ) {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.currentUserName = user.firstName;
      this.getFirstLetter();
    });
  }

  ngOnInit() {
    this.showActiveContainer('Fournisseurs');
    this.fetchSuppliers()
      .then(() => {
        return this.getActiveSuppliers();
      })
      .then(() => {
        this.setPage(this.currentPage);
      })
      .then(() => {
        return this.getInactiveSuppliers();
      })
      .catch((error: any) => {
        console.error('Error fetching suppliers', error);
      });

    this.fetchWarehouses();
  }

  fetchSuppliers(): Promise<void> {
    return this.supplyService
      .getFournisseurs()
      .toPromise()
      .then((suppliers) => {
        this.allSuppliers = suppliers;
      });
  }
  fetchWarehouses(): Promise<void> {
    return this.entrepotService
      .getWarehouse()
      .toPromise()
      .then((warehouses) => {
        return Promise.all(
          warehouses.map((warehouse: any) =>
            this.getWarehouseAddress(warehouse.addressId).then((address) => {
              warehouse.address = address;
              return warehouse;
            })
          )
        ).then((updatedWarehouses) => {
          this.allWarehouse = updatedWarehouses;
        });
      });
  }

  getActiveWarehouse(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.entrepotService.getWarehouse().subscribe({
        next: (warehouses) => {
          this.allWarehouse = warehouses.filter(
            (warehouse: { deletedAt: any }) => !warehouse.deletedAt
          );
          resolve();
        },
        error: (err) => reject(err),
      });
    });
  }

  getWarehouseAddress(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.entrepotService.getWarehouseAddress(id).subscribe({
        next: (address) => {
          resolve(address);
        },
        error: (err) => reject(err),
      });
    });
  }

  getActiveSuppliers(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.supplyService.getFournisseurs().subscribe({
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
      this.supplyService.getFournisseurs().subscribe({
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

  // Logic for the modal
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newSupplier = {
      name: '',
      email: '',
      siret: '',
      phone: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
    };
  }

  addSupplier(form: NgForm) {
    if (form.valid) {
      console.log('Fournisseur ajouté:', this.newSupplier);
      this.supplyService.postCreateSupply(this.newSupplier).subscribe({
        next: () => {
          this.fetchSuppliers()
            .then(() => {
              return this.getActiveSuppliers();
            })
            .then(() => {
              this.setPage(this.currentPage);
            })
            .then(() => {
              return this.getInactiveSuppliers();
            })
            .then(() => {
              this.closeModal();
            })
            .catch((error: any) => {
              console.error('Error fetching suppliers', error);
            });
        },
        error: (err) => {
          console.error('Error adding supplier', err);
        },
      });

      this.closeModal();
    } else {
      console.error('Le formulaire est invalide.');
    }
  }

  //  Stocks management
}
