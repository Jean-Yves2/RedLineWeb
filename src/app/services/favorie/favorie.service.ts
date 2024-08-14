import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavorieService {
  private apiUrl = environment.apiUrl;

  favoriteCountSubject = new BehaviorSubject<number>(0);
  public favoriteCount$ = this.favoriteCountSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.updateFavoriteCount();
  }

  addFavorite(productCode: number): void {
    if (this.authService.getIsAuthenticated()) {
      this.http
        .post<void>(
          `${this.apiUrl}/favorites/${productCode}`,
          { productCode },
          { withCredentials: true },
        )
        .pipe(
          switchMap(() => this.updateFavorites()),
          tap(() => this.updateFavoriteCount()),
          catchError((error) => {
            console.error('Error adding favorite', error);
            return of([]);
          }),
        )
        .subscribe();
    } else {
      this.saveToLocalFavorites(productCode);
      this.updateFavoriteCount();
    }
  }

  removeFavorite(productCode: number): void {
    if (this.authService.getIsAuthenticated()) {
      this.http
        .delete<void>(`${this.apiUrl}/favorites/${productCode}`, {
          withCredentials: true,
        })
        .pipe(
          switchMap(() => this.updateFavorites()),
          tap(() => this.updateFavoriteCount()),
          catchError((error) => {
            console.error('Error removing favorite', error);
            return of([]);
          }),
        )
        .subscribe();
    } else {
      this.removeFromLocalFavorites(productCode);
    }
  }

  getFavorites(): Observable<any[]> | number[] {
    if (this.authService.getIsAuthenticated()) {
      return this.http.get<any[]>(`${this.apiUrl}/favorites`, {
        withCredentials: true,
      });
    } else {
      return this.getLocalFavorites();
    }
  }

  updateFavoriteCount(): void {
    const isAuthenticated = this.authService.getIsAuthenticated();
    if (isAuthenticated) {
      const favorites$ = this.getFavorites();
      if (favorites$ instanceof Observable) {
        favorites$.subscribe((data) => {
          this.favoriteCountSubject.next(data.length);
        });
      }
    } else {
      const favorites = this.getLocalFavorites();
      this.favoriteCountSubject.next(favorites.length);
    }
  }

  public getLocalFavorites(): number[] {
    const favorites = localStorage.getItem('localFavorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  saveToLocalFavorites(productCode: number): void {
    let favorites = this.getLocalFavorites();
    if (!favorites.includes(productCode)) {
      favorites.push(productCode);
      localStorage.setItem('localFavorites', JSON.stringify(favorites));
    }
  }

  removeFromLocalFavorites(productCode: number): void {
    let favorites = this.getLocalFavorites();
    favorites = favorites.filter((code) => code !== productCode);
    localStorage.setItem('localFavorites', JSON.stringify(favorites));
    this.getLocalFavorites();
    this.updateFavoriteCount();
  }
  resetFavoriteCount(): void {
    this.favoriteCountSubject.next(0);
  }

  /**/
  public updateFavorites(): Observable<any[]> {
    if (this.authService.getIsAuthenticated()) {
      return this.http.get<any[]>(`${this.apiUrl}/favorites`, {
        withCredentials: true,
      });
    } else {
      return of(this.getLocalFavorites());
    }
  }
}
