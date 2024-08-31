import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DevisService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  postGlobalDiscount(discount: number, quoteId: number): Observable<any> {
    console.log('postGlobalDiscount', discount, quoteId);
    const body = {
      discount,
      quoteId,
    };
    const options = {
      withCredentials: true,
    };
    return this.http.post(
      `${this.apiUrl}/commercial/discount/global`,
      body,
      options
    );
  }

  applyProductDiscountToQuote(
    quoteId: number,
    productDiscounts: { [productId: number]: number }
  ): Observable<any> {
    const body = {
      quoteId,
      productDiscounts,
    };
    const options = {
      withCredentials: true,
    };
    return this.http.post(
      `${this.apiUrl}/commercial/discount/product`,
      body,
      options
    );
  }
}
