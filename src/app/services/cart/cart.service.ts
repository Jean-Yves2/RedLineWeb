import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  cartCountSubject = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  createCart(): Observable<any> {
    return this.http.post(`${this.apiUrl}`, {}, { withCredentials: true });
  }

  addItemToCart(
    productCode: number,
    quantity: number,
    length: number
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/item`,
      { productCode, quantity, length },
      { withCredentials: true }
    );
  }

  getCartByUserId(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { withCredentials: true });
  }

  removeItemFromCart(productCode: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/item`, {
      withCredentials: true,
      body: { productCode },
    });
  }

  updateCartCount(tableOfProducts: any): void {
    if (this.authService.getIsAuthenticated()) {
      this.cartCountSubject.next(tableOfProducts.length);
    } else {
    }
  }
}
