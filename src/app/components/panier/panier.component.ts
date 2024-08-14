import { Component } from '@angular/core';
import { Produit } from '../forme-matiere/interface/produit.model';
import { FormeMatiereService } from '../../services/forme_matiere/forme-matiere.service';
import { PanierService } from '../../services/panier/panier.service';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';

interface LocalProduct {
  id: string;
  range: { start: number; end: number };
  nom: string;
  schema: string;
  image: string;
}
interface LocalProducts {
  [key: string]: LocalProduct[];
}

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
  localProductsWithDataImage: LocalProducts;

  constructor(
    private panierService: PanierService,
    private formeMatiereService: FormeMatiereService,
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.localProductsWithDataImage = this.formeMatiereService
      .produits as LocalProducts;
  }

  ngOnInit(): void {
    this.produits = this.formeMatiereService.produits;
    this.loadCart();
  }

  getCart(): any[] {
    return this.panierService.getCart();
  }

  // Sert a l'affichage des informations de produits dans le panier pour un utilisateur non connecter
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

  // Sert a l'affichage des informations de produits dans le panier pour un utilisateur connecter
  // Fonction simplifiée avec typage pour trouver la correspondance et transformer en Produit
  mapApiProductToProduit(
    apiProduct: any,
    localProducts: LocalProducts
  ): Produit | null {
    for (const material in localProducts) {
      if (localProducts.hasOwnProperty(material)) {
        const products = localProducts[material];
        for (const product of products) {
          if (
            apiProduct.product.productCode >= product.range.start &&
            apiProduct.product.productCode <= product.range.end
          ) {
            return {
              // Propriétés locales
              id: apiProduct.product.id.toString(),
              nom: product.nom,
              schema: product.schema,
              image: product.image,

              // Propriétés de l'API
              details: apiProduct.product.description,
              quantite: apiProduct.quantity,
              longueur: apiProduct.length,
              description: apiProduct.product.description,
              basePrice: apiProduct.product.basePrice,
              unitPriceExclTax: apiProduct.product.unitPriceExclTax,
              VATRate: apiProduct.product.VATRate,
              marginPercent: apiProduct.product.marginPercent,
              sellingPrice: apiProduct.product.sellingPrice,
              linearWeight: apiProduct.product.linearWeight,
              thickness: apiProduct.product.thickness,
              height: apiProduct.product.height,
              width: apiProduct.product.width,
              diameter: apiProduct.product.diameter,
              circumference: apiProduct.product.circumference,
              sectionArea: apiProduct.product.sectionArea,
              weight: apiProduct.product.weight,
              matiere: apiProduct.product.matiere,
              productCode: apiProduct.product.productCode,
            };
          }
        }
      }
    }
    return null;
  }

  loadCart(): void {
    console.log(this.authService.getIsAuthenticated());
    if (this.authService.getIsAuthenticated()) {
      this.cartService.getCartByUserId().subscribe((data) => {
        this.paniers = data.items;
        this.panierProducts = [];

        this.paniers.forEach((apiProduct) => {
          const produit = this.mapApiProductToProduit(
            apiProduct,
            this.localProductsWithDataImage
          );

          if (produit) {
            this.panierProducts.push(produit);
          }
        });
        this.havedPanier = this.panierProducts.length > 0;
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
