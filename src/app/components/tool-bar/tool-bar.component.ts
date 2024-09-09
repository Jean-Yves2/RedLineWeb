import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FavorieService } from '../../services/favorie/favorie.service';
import { catchError, of, Subscription, switchMap } from 'rxjs';
import { PanierService } from '../../services/panier/panier.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  isInternal: boolean = false;
  currentUser: any;
  favoriteCounter: number = 0;
  cartCounter: number = 0;

  private favoritesSubscription!: Subscription;
  private cartSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private favorieService: FavorieService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.currentUser.subscribe((user) => {
        this.currentUser = user;
        this.isInternal = this.authService.isInternal();
        if (user) {
          this.updateFavorites();
        }
      })
    );

    this.subscriptions.add(
      this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.updateFavorites();
        } else {
          this.favorieService.resetFavoriteCount();
        }
      })
    );

    this.subscriptions.add(
      this.favorieService.favoriteCount$.subscribe((count) => {
        this.favoriteCounter = count;
      })
    );

    this.favorieService.updateFavoriteCount();

    this.subscriptions.add(
      this.panierService.cartItemCount$.subscribe((count) => {
        this.cartCounter = count;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  isCommercialOrManager(): boolean {
    const role = this.currentUser?.role;
    return role === 'COMMERCIAL' || role === 'SUPPLY_MANAGER';
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.favorieService.resetFavoriteCount();
    this.router.navigate(['/connexion']);
  }
  private updateFavorites(): void {
    if (this.isCommercialOrManager()) {
      return;
    }

    const favorites$ = this.favorieService.getFavorites();

    favorites$
      .pipe(
        switchMap((favorites) => {
          if (Array.isArray(favorites)) {
            this.favorieService.favoriteCountSubject.next(favorites.length);
            return of(favorites);
          } else {
            console.error('Les favoris récupérés ne sont pas un tableau');
            this.favorieService.favoriteCountSubject.next(0);
            return of([]);
          }
        }),
        catchError((error) => {
          console.error('Erreur lors de la mise à jour des favoris', error);
          this.favorieService.favoriteCountSubject.next(0);
          return of([]);
        })
      )
      .subscribe();
  }
}
