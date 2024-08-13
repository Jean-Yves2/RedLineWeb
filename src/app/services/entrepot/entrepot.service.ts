import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EntrepotService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getWarehouse(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/warehouse`);
  }

  getWarehouseAddress(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/address/${id}`);
  }
}
