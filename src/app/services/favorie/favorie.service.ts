import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavorieService {
  private FAVORITES_KEY = 'favorites';
  private nextId: number = 1;

  constructor() {
    const favorites = this.getFavorites();
  }

  getFavorites(): any[] {
    return JSON.parse(localStorage.getItem(this.FAVORITES_KEY) || '[]');
  }

  addFavorite(item: any): void {
    const favorites = this.getFavorites();

    const isExisting = favorites.some(
      (fav) =>
        fav.urlPart === item.urlPart &&
        fav.longueur === item.longueur &&
        fav.quantite === item.quantite &&
        fav.choix === item.choix
    );

    if (!isExisting) {
      const favoriteWithId = { ...item, fav_id: this.nextId++ };
      favorites.push(favoriteWithId);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    } else {
      console.log("L'élément existe déjà dans les favoris.");
    }
  }

  removeFavorite(id: number): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter((fav) => fav.fav_id !== id);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }
}
