import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent {
  user1 = {
    firstName: 'fghghf',
    lastName: 'fghfgh',
    email: 'fghfh',
    password: 'gffffffffffff',
    companyName: 'b,bn,',
    address: {
      street: 'bn,bn,b',
      postalCode: 'bn,b,b',
      city: 'nb,bn,b',
      country: 'b,bn,b,b',
      distanceToWarehouse: 10,
      type: 'bvnvbn',
    },
    phone: '000000000000000',
  };
  user = {
    username: '',
    password: '',
    email: '',
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
      },
      error: (error) => {
        console.error("Erreur lors de l'inscription", error);
      },
    });
  }
}
