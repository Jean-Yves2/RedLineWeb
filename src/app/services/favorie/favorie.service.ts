import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavorieService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  addFavorite(productCode: number): void {
    if (this.authService.isLoggedIn()) {
      this.http.post(`${this.apiUrl}`, { productCode } , { withCredentials: true }).subscribe();
    } else {
      this.saveToLocalFavorites(productCode);
    }
  }

  removeFavorite(productCode: number): void {
    if (this.authService.isLoggedIn()) {
      this.http.delete(`${this.apiUrl}?productCode=${productCode}`, { withCredentials: true }).subscribe();
    } else {
      this.removeFromLocalFavorites(productCode);
    }
  }

  getFavorites(): Observable<any[]> | number[] {
    if (this.authService.isLoggedIn()) {
      return this.http.get<any[]>(`${this.apiUrl}/favorites`, { withCredentials: true });
    } else {
      return this.getLocalFavorites();
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
}
