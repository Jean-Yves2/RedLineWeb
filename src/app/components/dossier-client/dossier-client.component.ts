import { Component, OnInit } from '@angular/core';
import { CommercialService } from '../../services/commercial/commercial.service';

@Component({
  selector: 'app-dossier-client',
  templateUrl: './dossier-client.component.html',
  styleUrls: ['./dossier-client.component.scss'],
})
export class DossierClientComponent implements OnInit {
  activContainerDossier: string | null = null;
  userOrder: any;
  selectedClientFavorie: any;
  selectedUser: any;

  constructor(private commercialService: CommercialService) {}

  ngOnInit(): void {
    this.showActiveContainerDossier('Menu');
    this.selectedUser = this.getSelectedClient();
  }

  getOrdersByCustomerId(id: number) {
    this.commercialService.getOrdersByCustomerId(id).subscribe({
      next: (data) => {
        this.userOrder = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la commande', error);
      },
    });
  }

  extractProductDetails() {
    if (!this.userOrder || !this.userOrder.orderLines) return;
    this.userOrder.orderLines.forEach((orderLine: { product: any }) => {
      const product = orderLine.product;
      if (product) {
        const { name, description, matiere } = product;
      }
    });
  }

  getSelectedClient() {
    return JSON.parse(localStorage.getItem('selectedClient') || '{}');
  }
  getClientId(): number | null {
    const client = this.getSelectedClient();
    return client.id || null;
  }

  showActiveContainerDossier(container: string) {
    this.activContainerDossier = container;

    if (container === 'Historique') {
      const storedClient = localStorage.getItem('selectedClient');
      const client = JSON.parse(storedClient || '{}');
      this.getOrdersByCustomerId(client.id);
    } else if (container === 'Favorie') {
    } else if (container === 'Panier') {
    } else if (container === 'Menu') {
    } else if (container === 'Dossier') {
    }
  }

  getUserFavorites() {
    const id = this.getClientId();
    if (id === null) {
      console.error(
        'Impossible de récupérer les favoris: ID client non trouvé'
      );
      return;
    }
    this.commercialService.getUserFavorites(id).subscribe({
      next: (data) => {
        this.selectedClientFavorie = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des favoris', error);
      },
    });
  }
}
