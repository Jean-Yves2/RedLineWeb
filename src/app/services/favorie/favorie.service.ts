import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavorieService {
  private FAVORITES_KEY = 'favorites';

  constructor() {}

  getFavorites(): any[] {
    return JSON.parse(localStorage.getItem(this.FAVORITES_KEY) || '[]');
  }

  addFavorite(item: any): void {
    const favorites = this.getFavorites();
    favorites.push(item);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }

  removeFavorite(item: any): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter((fav) => fav.id !== item.id);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }
}
