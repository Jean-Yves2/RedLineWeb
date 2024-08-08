import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavorieService {
  private FAVORITES_KEY = 'favorites';
  private nextId: number = this.getNextId();
  private favoritesSubjectCounter = new BehaviorSubject<number>(this.countFavorites());

  favorites$ = this.favoritesSubjectCounter.asObservable();

  constructor() {
    this.favoritesSubjectCounter.next(this.countFavorites());
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
      this.favoritesSubjectCounter.next(this.countFavorites());
    } else {
      console.log("L'élément existe déjà dans les favoris.");
    }
  }

  removeFavorite(id: number): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter((fav) => fav.fav_id !== id);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    this.favoritesSubjectCounter.next(this.countFavorites());
  }

  countFavorites(): number {
    return this.getFavorites().length;
  }
  private getNextId(): number {
    const fav = this.getFavorites();
    return fav.length ? Math.max(...fav.map(item => item.fav_id || 0)) + 1 : 1;
  }
}
