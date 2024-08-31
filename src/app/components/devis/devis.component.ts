import { Component, OnInit } from '@angular/core';
import { CommercialService } from '../../services/commercial/commercial.service';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.scss'],
})
export class DevisComponent implements OnInit {
  activContainer: string | null = null;
  allQuotes: any;
  selectedClient: any;
  userQuoteWithQuoteLines: any;
  stage: number = 1;

  discountsByProduct: { [productId: number]: number } = {};

  constructor(private commercialService: CommercialService) {}

  ngOnInit(): void {
    this.showActiveContainer('Devis');
  }
  setSelectedClient(client: any) {
    localStorage.setItem('selectedClient', JSON.stringify(client));
    this.updateClient();

    this.getQuoteByIdWithQuoteLines(client.id);
  }

  showActiveContainer(container: string) {
    this.activContainer = container;

    // Charger les données en fonction de la section active
    if (container === 'Devis' && !this.allQuotes) {
      this.getAllQuotesWithoutException();
    } else if (container === 'userDevis') {
    }
  }

  getAllQuotesWithoutException() {
    this.commercialService.getAllQuotesWithoutException().subscribe({
      next: (data) => {
        this.allQuotes = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des devis', error);
      },
    });
  }

  getQuoteByIdWithQuoteLines(id: number) {
    this.commercialService.getQuoteByIdWithQuoteLines(id).subscribe({
      next: (data) => {
        this.userQuoteWithQuoteLines = data;
        console.log('Devis avec lignes de devis : ', data);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du devis', error);
      },
    });
  }

  getSelectedClient() {
    return JSON.parse(localStorage.getItem('selectedClient') || '{}');
  }

  updateClient() {
    this.selectedClient = this.getSelectedClient();
    console.log('Client sélectionné updated : ', this.selectedClient);
    console.log('Client sélectionné updated id : ', this.selectedClient.id);
  }

  calculateTotal(): number {
    if (
      !this.userQuoteWithQuoteLines ||
      !this.userQuoteWithQuoteLines.quoteLines
    ) {
      return 0;
    }

    return this.userQuoteWithQuoteLines.quoteLines.reduce(
      (total: number, line: any) => {
        const sellingPrice = line.product.sellingPrice || 0;
        const quantity = line.quantity || 0;
        return total + sellingPrice * quantity;
      },
      0
    );
  }

  setStage(stage: number) {
    this.stage = stage;
  }
  areAllDiscountsFilled(): boolean {
    return Object.values(this.discountsByProduct).every(
      (discount) => discount !== null && discount !== undefined
    );
  }

  // Fonctions pour la gestion des remises par produit
  getDiscounts(): { [productId: number]: number } {
    return this.discountsByProduct;
  }
  updateDiscount(productId: number, discount: number): void {
    this.discountsByProduct[productId] = discount;
  }
  submitDiscounts(): void {
    const discounts = this.getDiscounts();
    console.log(discounts);
  }

  // Fonction pour la gestion des remises globales
  submitGlobalDiscount(): void {
    console.log(this.userQuoteWithQuoteLines.id);
  }
}
