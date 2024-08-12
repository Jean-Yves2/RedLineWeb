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
  produits: { [key: string]: Produit[] } = {};
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
      });
    } else {
      this.favorites = favorites;
    }
  }




  removeFavorite(item: any): void {
    this.favorieService.removeFavorite(item.fav_id);
  }
}
