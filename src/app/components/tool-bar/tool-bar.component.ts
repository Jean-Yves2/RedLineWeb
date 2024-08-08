import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FavorieService } from '../../services/favorie/favorie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit, OnDestroy {
  isInternal: boolean = false;
  currentUser: any;
  favoriteCounter: number = 0;
  private favoritesSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private favorieService: FavorieService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.isInternal = this.authService.isInternal();
    });

    this.favoritesSubscription = this.favorieService.favorites$.subscribe(
      (count) => {
        this.favoriteCounter = count;
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
    this.router.navigate(['/connexion']);
  }
}
