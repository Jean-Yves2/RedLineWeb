import { Component } from '@angular/core';
import { Produit } from '../forme-matiere/interface/produit.model';
import { FormeMatiereService } from '../../services/forme_matiere/forme-matiere.service';
import { PanierService } from '../../services/panier/panier.service';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss'],
})
export class PanierComponent {
  paniers: any[] = [];
  panierProducts: Produit[] = [];
  produits: { [key: string]: Produit[] } = {};
  havedPanier: boolean = false;

  constructor(
    private panierService: PanierService,
    private formeMatiereService: FormeMatiereService,
    private authService: AuthService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.produits = this.formeMatiereService.produits;
    this.loadCart();
  }

  getCart(): any[] {
    return this.panierService.getCart();
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
  /*
  ! Je Travaille ici --> je suis le flux de donner pour en faire l'affichage lorsque l'utilisateur est connecter
  */
  loadCart(): void {
    console.log(this.authService.getIsAuthenticated());
    if (this.authService.getIsAuthenticated()) {
      this.cartService.getCartByUserId().subscribe((data) => {
        this.paniers = data;
        console.log('loadCard', this.paniers);
        this.mapPanierToProducts();
      });
    } else {
      this.paniers = this.getCart();
      this.mapPanierToProducts();
    }
  }

  removeCart(item: any): void {
    this.panierService.removeFromCart(item.cart_id);
    this.loadCart();
  }
}
