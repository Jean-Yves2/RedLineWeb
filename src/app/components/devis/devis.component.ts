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

  constructor(private commercialService: CommercialService) {}

  ngOnInit(): void {
    this.showActiveContainer('Devis');
  }

  showActiveContainer(container: string) {
    this.activContainer = container;

    // Charger les données en fonction de la section active
    if (container === 'Devis' && !this.allQuotes) {
      this.getAllQuotesWithoutException();
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
}
