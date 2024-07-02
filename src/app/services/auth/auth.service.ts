import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(registerForm: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .post(`${this.apiUrl}/auth/register`, registerForm, { headers })
      .pipe(catchError((error) => throwError(() => error)));
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  login(email: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        map((response) => {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
