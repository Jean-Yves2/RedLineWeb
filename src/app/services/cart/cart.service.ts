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
      body: { productCode },
    });
  }
}
