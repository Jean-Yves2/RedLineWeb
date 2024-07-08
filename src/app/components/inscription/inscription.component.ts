import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(12)]],
      companyName: ['', [Validators.required]],
      address: this.formBuilder.group({
        street: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]],
        distanceToWarehouse: [0],
        type: ['DELIVERY'],
      }),
      phone: [
        '',
        [Validators.required, Validators.pattern('^\\+?[0-9 ()-]+$')],
      ],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/connexion']);
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription", error);
          if (error.status === 400 && error.error.message.includes('Email')) {
            this.errorMessage = 'Cet email est déjà utilisé.';
          } else {
            this.errorMessage =
              "Une erreur s'est produite lors de l'inscription.";
          }
        },
      });
    } else {
      console.log('Form not valid');
      this.displayFormErrors();
    }
  }

  private displayFormErrors() {
    for (const control in this.registerForm.controls) {
      if (this.registerForm.controls.hasOwnProperty(control)) {
        const formControl = this.registerForm.get(control);
        if (formControl && formControl.invalid) {
          console.log(`Invalid field: ${control}`, formControl.errors);
        }

        if (formControl instanceof FormGroup) {
          for (const subControl in formControl.controls) {
            if (formControl.controls.hasOwnProperty(subControl)) {
              const subFormControl = formControl.get(subControl);
              if (subFormControl && subFormControl.invalid) {
                console.log(
                  `Invalid field: ${control}.${subControl}`,
                  subFormControl.errors
                );
              }
            }
          }
        }
      }
    }
  }
}
