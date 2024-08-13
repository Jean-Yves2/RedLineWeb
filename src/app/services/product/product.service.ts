import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Product } from './product.model.dto';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import {localProducts} from '../table_data/localProducts';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  localProducts: Product[] = localProducts as unknown as Product[];

  constructor(private http: HttpClient , private authService: AuthService) {}

  getProductsByType(type: string): Observable<Product[]> {
    return this.authService.isLoggedIn().pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.http.get<Product[]>(`${this.apiUrl}/products/${type}`);
        } else {
          this.localProducts = localProducts as unknown as Product[];
          const { min, max } = this.getRangeByType(type);
          const filteredProducts = this.localProducts.filter(product =>
            product.productCode !== undefined && product.productCode >= min && product.productCode <= max
          );
          return of(filteredProducts);
        }
      }),
      catchError(err => {
        console.error('Error fetching products:', err);
        return of([]);
      })
    );
    }
  private getRangeByType(type: string): { min: number, max: number } {
    switch (type) {
      case 'alu1':
        return { min: 1, max: 8 };
      case 'alu2':
        return { min: 9, max: 28 };
      case 'alu3':
        return { min: 29, max: 48 };
      case 'alu4':
        return { min: 49, max: 56 };
      case 'alu5':
        return { min: 57, max: 73 };
      case 'inox1':
        return { min: 74, max: 82 };
      case 'inox2':
        return { min: 83, max: 91 };
      case 'inox3':
        return { min: 92, max: 109 };
      case 'inox4':
        return { min: 110, max: 124 };
      case 'inox5':
        return { min: 125, max: 134 };
      case 'galva1':
        return { min: 135, max: 138 };
      case 'galva2':
        return { min: 139, max: 149 };
      case 'galva3':
        return { min: 150, max: 160 };
      case 'galva4':
        return { min: 161, max: 169 };
      case 'galva5':
        return { min: 170, max: 172 };
      default:
        return { min: 0, max: 0 };
    }
  }
  getLocalProductsByType(type: string): Product[] {
    const { min, max } = this.getRangeByType(type);
    return this.localProducts.filter(product =>
      product.productCode !== undefined && product.productCode >= min && product.productCode <= max
    );
  }
}
