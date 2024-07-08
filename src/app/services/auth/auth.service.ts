import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
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

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
  }

  setSession(authResult: any) {
    Cookies.set('access_token', authResult.access_token);
  }

  logout(): void {
    this.http
      .post(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          this.router.navigate(['/connexion']);
        },
        error: (error) => {
          console.error('Erreur lors de la déconnexion côté serveur : ', error);
        },
      });
  }

  public isLoggedIn(): boolean {
    return !!Cookies.get('access_token');
  }

  public getToken(): string | undefined {
    return Cookies.get('access_token');
  }
}
