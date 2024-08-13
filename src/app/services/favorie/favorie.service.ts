import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavorieService {
  private apiUrl = environment.apiUrl;

   favoriteCountSubject = new BehaviorSubject<number>(0);
  public favoriteCount$ = this.favoriteCountSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.updateFavoriteCount();
  }

  addFavorite(productCode: number): void {
    if (this.authService.isLoggedIn()) {
      this.http.post(`${this.apiUrl}/favorites/${productCode}`, { productCode } , { withCredentials: true }).subscribe();
      this.updateFavoriteCount();
    } else {
      this.saveToLocalFavorites(productCode);
      this.updateFavoriteCount();
    }
  }

  removeFavorite(productCode: number): void {
    if (this.authService.isLoggedIn()) {
      this.http.delete(`${this.apiUrl}/favorites/${productCode}`, { withCredentials: true }).subscribe();
      this.updateFavoriteCount();
    } else {
      this.removeFromLocalFavorites(productCode);
      this.updateFavoriteCount();
    }
  }

  getFavorites(): Observable<any[]> | number[] {
    if (this.authService.isLoggedIn()) {
      return this.http.get<any[]>(`${this.apiUrl}/favorites`, { withCredentials: true });
    } else {
      return this.getLocalFavorites();
    }
  }

  private updateFavoriteCount(): void {
    const favorites = this.authService.isLoggedIn() ? this.getFavorites() : this.getLocalFavorites();
    if (favorites instanceof Observable) {
      favorites.subscribe((data) => {
        this.favoriteCountSubject.next(data.length);
      });
    } else {
      this.favoriteCountSubject.next(favorites.length);
    }
  }

  public getLocalFavorites(): number[] {
    const favorites = localStorage.getItem('localFavorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  private saveToLocalFavorites(productCode: number): void {
    let favorites = this.getLocalFavorites();
    if (!favorites.includes(productCode)) {
      favorites.push(productCode);
      localStorage.setItem('localFavorites', JSON.stringify(favorites));
    }
  }

  private removeFromLocalFavorites(productCode: number): void {
    let favorites = this.getLocalFavorites();
    favorites = favorites.filter(code => code !== productCode);
    localStorage.setItem('localFavorites', JSON.stringify(favorites));
  }
  public resetFavoriteCount(): void {
    this.favoriteCountSubject.next(0);
  }
}
