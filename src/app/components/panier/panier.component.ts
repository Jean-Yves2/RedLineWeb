import { Component } from '@angular/core';
import { Produit } from '../forme-matiere/interface/produit.model';
import { FormeMatiereService } from '../../services/forme_matiere/forme-matiere.service';
import { PanierService } from 'src/app/services/panier/panier.service';


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent {

  paniers: any[] = [];
  panierProducts: Produit[] = [];
  produits: { [key: string]: Produit[] } = {};
  havedPanier: boolean = false;

  constructor(
    private cartService: PanierService,
    private formeMatiereService: FormeMatiereService
  ) {}

  ngOnInit(): void {
    this.produits = this.formeMatiereService.produits;
    this.loadCart();
  }

  getCart(): any[] {
    return this.cartService.getCart();
  }

  // Sert a l'affichage des informations de produits dans le panier
  mapPanierToProducts(): void {
    this.panierProducts = [];
    this.paniers.forEach((cart) => {
      for (const key in this.produits) {
        if (this.produits.hasOwnProperty(key)) {
          let product = this.produits[key].find((p) => p.id === cart.urlPart);

          if (product) {
            (product as any).cart_id = cart.cart_id;
            (product as any).quantite = cart.quantite;
            (product as any).longueur = cart.longueur;
            (product as any).choix = cart.choix;
            (product as any).description = cart.description;

            this.panierProducts.push(product);
          }
        }
      }
    });
    this.havedPanier = this.panierProducts.length > 0;
  }

  loadCart(): void {
    this.paniers = this.getCart();
    console.log( 'dsgdfg',this.paniers);
    this.mapPanierToProducts();
  }

  removeCart(item: any): void {
    this.cartService.removeFromCart(item.cart_id);
    this.loadCart();
  }

}
