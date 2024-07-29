import { Component } from '@angular/core';

interface Ligne {
  epaisseur: number;
  hauteur: number;
  largeur: number;
  masse: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  lignes: Ligne[] = [
    { epaisseur: 3, hauteur: 20, largeur: 20, masse: 0.97 },
    { epaisseur: 4, hauteur: 20, largeur: 20, masse: 1.32 },
    { epaisseur: 3, hauteur: 30, largeur: 30, masse: 1.51 },
    { epaisseur: 4, hauteur: 40, largeur: 40, masse: 2.67 },
    { epaisseur: 5, hauteur: 50, largeur: 50, masse: 4.18 },
    { epaisseur: 6, hauteur: 60, largeur: 60, masse: 6.02 },
    { epaisseur: 8, hauteur: 80, largeur: 80, masse: 10.7 },
    { epaisseur: 8, hauteur: 100, largeur: 100, masse: 13.42 },
    { epaisseur: 10, hauteur: 100, largeur: 100, masse: 16.61 },
  ];

  longueur: number = 0;
  quantite: number = 1;
  resultat: number = 0;
  updateSelection: Ligne | null = null;

  calcule(): void {
    if (this.updateSelection) {
      const poidsUnitaire = this.updateSelection.masse * this.longueur;
      this.resultat = poidsUnitaire * this.quantite;
    }
  }

  setupdateSelection(ligne: Ligne): void {
    this.updateSelection = ligne;
    this.calcule();
  }
}
