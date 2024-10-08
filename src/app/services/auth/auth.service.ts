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

  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!storedUser);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
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
          this.isAuthenticatedSubject.next(true);
        }),
        catchError((error) => of(error))
      );
  }

  logout(): void {
    this.http
      .post(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
          this.isAuthenticatedSubject.next(false);
          this.router.navigate(['/connexion']);
        },
        error: (error) => {
          console.error('Erreur lors de la déconnexion côté serveur : ', error);
        },
      });
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/refresh-token`, {
      withCredentials: true,
    });
  }

  public isInternal(): boolean {
    const user = this.currentUserSubject.value;
    return (
      user && (user.role === 'SUPPLY_MANAGER' || user.role === 'COMMERCIAL')
    );
  }

  public getIsAuthenticated(): Observable<boolean> {
    this.isAuthenticated$.subscribe((value) => {
      console.log('getIsAuthenticated:', value);
    });
    return this.isAuthenticated$;
  }
}
