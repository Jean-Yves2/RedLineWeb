import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FavorieService } from '../../services/favorie/favorie.service';
import { Observable, Subscription } from 'rxjs';
import { PanierService } from '../../services/panier/panier.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit, OnDestroy {
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

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.isInternal = this.authService.isInternal();
      if (user) {
        this.updateFavorites();
      }
    });

    this.authService.getIsAuthenticated().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.updateFavorites();
      } else {
        this.favorieService.resetFavoriteCount();
      }
    });

    this.favoritesSubscription = this.favorieService.favoriteCount$.subscribe(
      (count) => {
        this.favoriteCounter = count;
      }
    );
    this.favorieService.updateFavoriteCount();

    /*this.cartSubscription = this.panierService.cartItemCount$.subscribe(
      (count) => {
        this.cartCounter = count;
      }
    );*/
  }

  ngOnDestroy() {
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

    const favorites = this.favorieService.getFavorites();

    if (favorites instanceof Observable) {
      favorites.subscribe((data) => {
        this.favorieService.favoriteCountSubject.next(data.length);
      });
    } else {
      this.favorieService.favoriteCountSubject.next(favorites.length);
    }
  }
}
