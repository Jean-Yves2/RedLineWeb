import { Component, OnInit } from '@angular/core';
import { FavorieService } from '../../services/favorie/favorie.service';
import { Produit } from '../forme-matiere/interface/produit.model';
import { FormeMatiereService } from '../../services/forme_matiere/forme-matiere.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  favorites: any[] = [];
  favoriteProducts: Produit[] = [];
  produits: { [key: string]: { id: string, details?: string, range?: { start: number, end: number }, nom: string, schema: string, image: string }[] } = {};
  havedFavorites: boolean = false;

  constructor(
    private favorieService: FavorieService,
    private formeMatiereService: FormeMatiereService,
  ) {}

  ngOnInit(): void {
    this.produits = this.formeMatiereService.produits;

    const favorites = this.favorieService.getFavorites();
    console.log(favorites);

    if (favorites instanceof Observable) {
      favorites.subscribe((data) => {
        this.favorites = data;
        console.log(this.favorites);
        this.updateFavoritesWithImages();
      });
    } else {
      this.favorites = favorites;
      this.updateFavoritesWithImages();
    }
  }

  findProductByCode(productCode: number): { schema: string, image: string } | null {
    for (const key in this.produits) {
      if (this.produits.hasOwnProperty(key)) {
        for (const product of this.produits[key]) {
          if (product.range && productCode >= product.range.start && productCode <= product.range.end) {
            return { schema: product.schema, image: product.image };
          }
        }
      }
    }
    return null;
  }

  updateFavoritesWithImages(): void {
    this.favorites = this.favorites.map((favorite) => {
      const productImageData = this.findProductByCode(favorite.productCode);
      return {
        ...favorite,
        schema: productImageData?.schema || 'assets/images/default-schema.png',
        image: productImageData?.image || 'assets/images/default-image.png',
      };
    });
  }

  removeFavorite(item: any): void {
    this.favorieService.removeFavorite(item.fav_id);
  }
}
