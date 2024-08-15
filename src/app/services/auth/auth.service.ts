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
  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.isAuthenticated = !!storedUser;
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
          this.trueAuthentication();
        }),
        catchError((error) => of(error))
      );
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/auth/refresh-token`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  logout(): void {
    this.http
      .post(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          localStorage.removeItem('currentUser');
          this.resetAuthentication();
          this.router.navigate(['/connexion']);
        },
        error: (error) => {
          console.error('Erreur lors de la déconnexion côté serveur : ', error);
        },
      });
  }

  /* public isLoggedIn(): Observable<boolean> {
    if (this.isAuthenticated) {
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
  }*/

  public isInternal(): boolean {
    const user = this.currentUserSubject.value;
    return (
      user && (user.role === 'SUPPLY_MANAGER' || user.role === 'COMMERCIAL')
    );
  }
  public resetAuthentication(): void {
    this.isAuthenticated = false;
  }
  public trueAuthentication(): void {
    this.isAuthenticated = true;
  }
  public getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
  public resetCurrentUser(): void {
    this.currentUserSubject.next('');
  }
}
