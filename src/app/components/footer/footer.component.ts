import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isInternal: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.isInternal = user
        ? user.role === 'SUPPLY_MANAGER' || user.role === 'COMMERCIAL'
        : false;
    });
  }
}
