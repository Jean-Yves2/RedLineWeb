import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FavorieService } from '../../services/favorie/favorie.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private favorieService: FavorieService,
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(12)]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(
        this.formControls['email'].value,
        this.formControls['password'].value,
      )
      .subscribe({
        next: (user) => {
          if (user.user.role == 'COMMERCIAL') {
            this.router.navigate(['/commercial']);
          } else if (user.user.role == 'SUPPLY_MANAGER') {
            this.router.navigate(['/approvisionnement']);
          } else {
            this.favorieService.updateFavoriteCount();
            this.router.navigate(['/']);
          }
        },
        error: () => {
          this.errorMessage = 'Email ou mot de passe incorrect.';
          this.loading = false;
        },
      });
  }
}
