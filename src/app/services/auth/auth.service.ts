import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private isAuthenticated: boolean | null = null;

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
    return this.http
      .post<any>(
        `${this.apiUrl}/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }),
        catchError((error) => of(error))
      );
  }

  logout(): void {
    this.resetAuthentication();
    this.http
      .post(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
          this.resetAuthentication();
          this.router.navigate(['/connexion']);
        },
        error: (error) => {
          console.error('Erreur lors de la déconnexion côté serveur : ', error);
        },
      });
  }

  public isLoggedIn(): Observable<boolean> {
    if (this.isAuthenticated !== null) {
      return of(this.isAuthenticated);
    }

    return this.http
      .get<{ isAuthenticated: boolean }>(`${environment.apiUrl}/auth/check-auth`, { withCredentials: true })
      .pipe(
        map((response) => {
          this.isAuthenticated = response.isAuthenticated;
          return this.isAuthenticated;
        }),
        catchError(() => {
          this.isAuthenticated = false;
          return of(false);
        })
      );
    }

  public isInternal(): boolean {
    const user = this.currentUserSubject.value;
    return (
      user && (user.role === 'SUPPLY_MANAGER' || user.role === 'COMMERCIAL')
    );
  }
  public resetAuthentication(): void {
    this.isAuthenticated = null;
  }
}
