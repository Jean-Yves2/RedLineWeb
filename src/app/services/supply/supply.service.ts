import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplyService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  postCreateSupply(supply: any) {
    console.log('supply', supply);

    const supplyData = {
      name: supply.name,
      SIRET: supply.siret,
      address: {
        street: supply.street,
        city: supply.city,
        postalCode: supply.postalCode,
        country: supply.country,
      },
      contactEmail: supply.email,
      contactPhone: supply.phone,
    };
    console.log('supplyData', supplyData);
    const options = {
      withCredentials: true,
    };
    return this.http.post(`${this.apiUrl}/supplier`, supplyData, options);
  }

  getFournisseurs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/supplier`);
  }
}
