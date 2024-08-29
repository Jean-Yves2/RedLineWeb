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

  constructor(private commercialService: CommercialService) {}

  ngOnInit(): void {
    this.showActiveContainerDossier('Menu');
  }

  getOrdersByCustomerId(id: number) {
    this.commercialService.getOrdersByCustomerId(id).subscribe({
      next: (data) => {
        this.userOrder = data;
        console.log('Commande récupérée avec succès', data);
        console.log(
          'Détails de la commande:',
          this.userOrder[0].orderLines[0].product.name
        );
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la commande', error);
      },
    });
  }

  extractProductDetails() {
    console.log('Extraction des détails des produits');
    if (!this.userOrder || !this.userOrder.orderLines) return;
    console.log('Lignes de commande:', this.userOrder.orderLines);
    this.userOrder.orderLines.forEach((orderLine: { product: any }) => {
      const product = orderLine.product;
      if (product) {
        const { name, description, matiere } = product;
        console.log(`Nom: ${name}`);
        console.log(`Description: ${description}`);
        console.log(`Matière: ${matiere}`);
      }
    });
  }

  getSelectedClient() {
    return JSON.parse(localStorage.getItem('selectedClient.id') || '{}');
  }
  getClientId(): number | null {
    const client = this.getSelectedClient();
    return client.id || null;
  }

  showActiveContainerDossier(container: string) {
    console.log(`Section activée: ${container}`);
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
}
