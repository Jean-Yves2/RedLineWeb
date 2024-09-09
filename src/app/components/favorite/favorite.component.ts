import { Component, OnInit } from '@angular/core';
import { FavorieService } from '../../services/favorie/favorie.service';
import { Produit } from '../forme-matiere/interface/produit.model';
import { FormeMatiereService } from '../../services/forme_matiere/forme-matiere.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { localProducts } from '../../services/table_data/localProducts';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  favorites: any[] = [];
  favoriteProducts: Produit[] = [];
  produits: {
    [key: string]: {
      id: string;
      details?: string;
      range?: { start: number; end: number };
      nom: string;
      schema: string;
      image: string;
    }[];
  } = {};
  havedFavorites: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(
    private favorieService: FavorieService,
    private formeMatiereService: FormeMatiereService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.produits = this.formeMatiereService.produits;
    this.authService
      .getIsAuthenticated()
      .subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          const favorites = this.favorieService.getFavorites();
          this.favorieService.updateFavoriteCount();
          if (favorites instanceof Observable) {
            favorites.subscribe((data) => {
              this.favorites = data;
              this.updateFavoritesWithImages();
            });
          } else {
          }
        } else {
          const localFavorites = this.favorieService.getLocalFavorites();
          this.favorites = localFavorites;
          Promise.resolve().then(() => this.updateFavoritesWithImages());
        }
      });
  }

  findProductByCode(
    productCode: number
  ): { schema: string; image: string } | null {
    for (const key in this.produits) {
      if (this.produits.hasOwnProperty(key)) {
        for (const product of this.produits[key]) {
          if (
            product.range &&
            productCode >= product.range.start &&
            productCode <= product.range.end
          ) {
            return { schema: product.schema, image: product.image };
          }
        }
      }
    }
    return null;
  }

  updateFavoritesWithImages(): void {
    this.authSubscription.add(
      this.authService.isAuthenticated$.subscribe({
        next: (isAuthenticated) => {
          if (isAuthenticated) {
            this.favorites = this.favorites.map((favorite) => {
              const productImageData = this.findProductByCode(
                favorite.productCode
              );
              return {
                ...favorite,
                schema:
                  productImageData?.schema ||
                  'assets/images/default-schema.png',
                image:
                  productImageData?.image || 'assets/images/default-image.png',
              };
            });
          } else {
            const localFav = this.favorieService.getLocalFavorites();
            this.favorites = localFav.map((productCode) => {
              const productImageData = this.findProductByCode(productCode);
              return {
                productCode,
                schema:
                  productImageData?.schema ||
                  'assets/images/default-schema.png',
                image:
                  productImageData?.image || 'assets/images/default-image.png',
              };
            });
          }
        },
        error: (err) => {
          console.error(
            "Erreur lors de la vérification du statut d'authentification : ",
            err
          );
        },
      })
    );
  }

  removeFavorite(item: any): void {
    this.authSubscription.add(
      this.authService.isAuthenticated$.subscribe({
        next: (isAuthenticated) => {
          if (isAuthenticated) {
            this.favorieService.removeFavorite(item.productCode);
            this.favorites = this.favorites.filter(
              (fav) => fav.productCode !== item.productCode
            );
            this.havedFavorites = this.favorites.length === 0;
          } else {
            this.favorieService.removeFromLocalFavorites(item.productCode);
            this.favorites = this.favorites.filter((fav) => fav !== item);
            this.havedFavorites = this.favorites.length === 0;
          }
        },
        error: (err) => {
          console.error(
            "Erreur lors de la vérification du statut d'authentification : ",
            err
          );
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
