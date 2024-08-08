import { Component, OnInit } from '@angular/core';
import { FavorieService } from 'src/app/services/favorie/favorie.service';
import { Produit } from '../forme-matiere/interface/produit.model';
import { FormeMatiereService } from '../../services/forme_matiere/forme-matiere.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  favorites: any[] = [];
  favoriteProducts: Produit[] = [];
  produits: { [key: string]: Produit[] } = {};
  havedFavorites: boolean = false;

  constructor(
    private favorieService: FavorieService,
    private formeMatiereService: FormeMatiereService
  ) {}

  ngOnInit(): void {
    this.produits = this.formeMatiereService.produits;
    this.loadFavorites();
  }

  getFavorites(): any[] {
    return this.favorieService.getFavorites();
  }

  mapFavoritesToProducts(): void {
    this.favoriteProducts = [];
    this.favorites.forEach((fav) => {
      for (const key in this.produits) {
        if (this.produits.hasOwnProperty(key)) {
          let product = this.produits[key].find((p) => p.id === fav.urlPart);

          if (product) {
            (product as any).fav_id = fav.fav_id;
            (product as any).fav_id = fav.fav_id;
            (product as any).quantite = fav.quantite;
            (product as any).longueur = fav.longueur;
            (product as any).choix = fav.choix;
            this.favoriteProducts.push(product);
          }
        }
      }
    });
    this.havedFavorites = this.favoriteProducts.length > 0;
  }

  loadFavorites(): void {
    this.favorites = this.getFavorites();
    this.mapFavoritesToProducts();
  }

  removeFavorite(item: any): void {
    this.favorieService.removeFavorite(item.fav_id);
    this.loadFavorites();
  }
}
