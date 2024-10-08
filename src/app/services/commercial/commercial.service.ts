import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommercialService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllQuotesWithoutException(): Observable<any> {
    return this.http.get(`${this.apiUrl}/commercial/quotes`, {
      withCredentials: true,
    });
  }
  getOrdersByCustomerId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/order/customer/${id}`, {
      withCredentials: true,
    });
  }

  getUserFavorites(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/favorites/${id}`, {
      withCredentials: true,
    });
  }

  getQuoteByIdWithQuoteLines(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/quote/user/${id}`, {
      withCredentials: true,
    });
  }
}
