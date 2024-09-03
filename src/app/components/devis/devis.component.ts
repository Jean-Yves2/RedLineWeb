import { Component, OnInit } from '@angular/core';
import { CommercialService } from '../../services/commercial/commercial.service';
import { DevisService } from '../../services/devis/devis.service';

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

  globalDiscount: number = 0;

  discountsByProduct: { [productId: number]: number } = {};

  constructor(
    private commercialService: CommercialService,
    private devisService: DevisService
  ) {}

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

  getDiscounts(): { [productId: number]: number } {
    return this.discountsByProduct;
  }
  updateDiscount(productId: number, discount: number): void {
    this.discountsByProduct[productId] = discount;
  }

  isDiscountValid(): boolean {
    return this.globalDiscount >= 0 && this.globalDiscount <= 100;
  }

  updateGlobalDiscount(discount: number): void {
    this.globalDiscount = discount;
  }

  // Discounts by product
  submitDiscounts(): void {
    const discounts = this.getDiscounts();

    this.devisService
      .applyProductDiscountToQuote(this.userQuoteWithQuoteLines.id, discounts)
      .subscribe({
        next: (data) => {
          console.log('Remises appliquées avec succès');
        },
        error: (error) => {
          console.error("Erreur lors de l'application des remises", error);
        },
      });
  }

  // Global discounts
  submitGlobalDiscount(): void {
    this.devisService
      .postGlobalDiscount(this.globalDiscount, this.userQuoteWithQuoteLines.id)
      .subscribe({
        next: (data) => {
          this.userQuoteWithQuoteLines(this.selectedClient.id);
        },
        error: (error) => {
          console.error(
            "Erreur lors de l'application de la remise globale",
            error
          );
        },
      });
  }
}
