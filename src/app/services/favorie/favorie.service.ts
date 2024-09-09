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

  constructor(private http: HttpClient, private authService: AuthService) {
    this.updateFavoriteCount();
  }

  addFavorite(productCode: number): void {
    this.authService.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          this.http
            .post<void>(
              `${this.apiUrl}/favorites/${productCode}`,
              { productCode },
              { withCredentials: true }
            )
            .pipe(
              switchMap(() => this.updateFavorites()),
              tap(() => this.updateFavoriteCount()),
              catchError((error) => {
                console.error('Error adding favorite', error);
                return of(null);
              })
            )
            .subscribe();
        } else {
          this.saveToLocalFavorites(productCode);
          this.updateFavoriteCount();
        }
      },
      error: (error) => {
        console.error('Error checking authentication status', error);
      },
    });
  }

  removeFavorite(productCode: number): void {
    this.authService.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          this.http
            .delete<void>(`${this.apiUrl}/favorites/${productCode}`, {
              withCredentials: true,
            })
            .pipe(
              switchMap(() => this.updateFavorites()),
              tap(() => this.updateFavoriteCount()),
              catchError((error) => {
                console.error('Error removing favorite', error);
                return of(null);
              })
            )
            .subscribe();
        } else {
          this.removeFromLocalFavorites(productCode);
          this.updateFavoriteCount();
        }
      },
      error: (error) => {
        console.error('Error checking authentication status', error);
      },
    });
  }

  getFavorites(): Observable<any[]> {
    return this.authService.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          return this.http.get<any[]>(`${this.apiUrl}/favorites`, {
            withCredentials: true,
          });
        } else {
          return of(this.getLocalFavorites());
        }
      }),
      catchError((error) => {
        console.error('Error fetching favorites', error);
        return of([]);
      })
    );
  }

  updateFavoriteCount(): void {
    this.authService.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          this.getFavorites().subscribe({
            next: (data) => {
              this.favoriteCountSubject.next(data.length);
            },
            error: (error) => {
              console.error('Error updating favorite count', error);
              this.favoriteCountSubject.next(0);
            },
          });
        } else {
          const favorites = this.getLocalFavorites();
          this.favoriteCountSubject.next(favorites.length);
        }
      },
      error: (error) => {
        console.error('Error checking authentication status', error);
      },
    });
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
    return this.authService.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          return this.http.get<any[]>(`${this.apiUrl}/favorites`, {
            withCredentials: true,
          });
        } else {
          return of(this.getLocalFavorites());
        }
      }),
      catchError((error) => {
        console.error('Erreur lors de la mise à jour des favoris', error);
        return of([]);
      })
    );
  }
}
