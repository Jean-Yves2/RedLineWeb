import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFournisseurs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/supplier`);
  }
}
