import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private CART_KEY = 'cart';
  private cartItemCountSubject = new BehaviorSubject<number>(this.countCartItems());
  private nextId: number = this.getNextId();

  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor() {
    this.cartItemCountSubject.next(this.countCartItems());
  }

  getCart(): any[] {
    return JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
  }

  addToCart(item: any): void {
    const cart = this.getCart();
    console.log('cart', cart);

    let isExisting = cart.some(
      (cartItem) =>
        cartItem.urlPart === item.urlPart &&
        cartItem.longueur === item.longueur &&
        cartItem.quantite === item.quantite &&
        cartItem.choix === item.choix
    );

    if (!isExisting) {
      const cartwithId = { ...item, cart_id: this.nextId++ };
      cart.push(cartwithId);
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
      this.cartItemCountSubject.next(this.countCartItems());
    } else {
      console.log("L'élément existe déjà dans le Panier.");
    }
  }

  removeFromCart(id: number): void {
    let cart = this.getCart();
    cart = cart.filter(cartItem => cartItem.cart_id !== id);
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    this.cartItemCountSubject.next(this.countCartItems());
  }

  clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
    this.cartItemCountSubject.next(this.countCartItems());
  }

  countCartItems(): number {
    return this.getCart().length;
  }

  private getNextId(): number {
    const cart = this.getCart();
    return cart.length ? Math.max(...cart.map(item => item.cart_id || 0)) + 1 : 1;
  }
}
