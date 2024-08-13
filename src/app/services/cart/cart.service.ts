import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  createCart(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { userId });
  }

  addItemToCart(cartId: number, productCode: number, quantity: number, length: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/item`, { cartId, productCode, quantity, length });
  }

  getCartByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  removeItemFromCart(cartId: number, productCode: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/item`, {
      body: { cartId, productCode },
    });
  }
}
