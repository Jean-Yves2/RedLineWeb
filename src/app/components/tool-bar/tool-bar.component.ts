import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FavorieService } from '../../services/favorie/favorie.service';
import { Observable, Subscription } from 'rxjs';
import { PanierService } from 'src/app/services/panier/panier.service';

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

    this.favoritesSubscription = this.favorieService.favoriteCount$.subscribe(
      (count) => {
        this.favoriteCounter = count;
      }
    );


    this.cartSubscription = this.panierService.cartItemCount$.subscribe(
      (count) => {
        this.cartCounter = count;
      }
    );


  }

  ngOnDestroy() {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  isCommercial(): boolean {
    return (
      this.currentUser?.user.role === 'COMMERCIAL' ||
      this.currentUser?.user.role === 'SUPPLY_MANAGER'
    );
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.authService.resetAuthentication();
    this.router.navigate(['/connexion']);
  }
  private updateFavorites(): void {
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
