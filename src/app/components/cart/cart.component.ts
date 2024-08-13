import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCartByUserId(1).subscribe((data) => {
      this.cart = data;
    });
  }

  addItemToCart(productCode: number, quantity: number, length: number): void {
    const cartId = this.cart.id;
    this.cartService.addItemToCart(cartId, productCode, quantity, length).subscribe(() => {
      this.loadCart();
    });
  }

  removeItemFromCart(productCode: number): void {
    const cartId = this.cart.id;
    this.cartService.removeItemFromCart(cartId, productCode).subscribe(() => {
      this.loadCart();
    });
  }
}
