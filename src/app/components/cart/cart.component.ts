import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCartByUserId().subscribe((data) => {
      this.cart = data;
    });
  }

  addItemToCart(productCode: number, quantity: number, length: number): void {
    this.cartService
      .addItemToCart(productCode, quantity, length)
      .subscribe(() => {
        this.loadCart();
      });
  }

  removeItemFromCart(productCode: number): void {
    this.cartService.removeItemFromCart(productCode).subscribe(() => {
      this.loadCart();
    });
  }
}
