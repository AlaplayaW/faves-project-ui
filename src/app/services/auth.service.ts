import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);

  apiUrl: string = `${environment.apiUrl}`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  signUp(user: User): Observable<any> {
    let api = `${this.apiUrl}/users`;
    console.log("Tentative d'inscription avec les données suivantes :", user);
    return this.http.post(api, user, { headers: this.headers }).pipe(
      catchError(this.handleError),
      tap(() => {
        this.router.navigate(['/auth/login']);
      })
    );
  }

  signIn(user: User) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, user, { headers: this.headers })
      .subscribe((res: any) => {
        if (res && res.token) {
          localStorage.setItem('jwt', JSON.stringify(res.token));

          this.http
            .get<User>(`${this.apiUrl}/current-user`, { headers: this.headers })
            .subscribe((userDetails: User) => {
              localStorage.setItem('user', JSON.stringify(userDetails));

              this.router.navigate(['/app/feed']);
            });
        } else {
          console.error('Authentification échouée :', res);
        }
      });
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('jwt');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    console.log('removeToken: ', removeToken);
    if (removeToken == null) {
      this.router.navigate(['/auth/connexion']);
    }
  }

  getUserProfile(id: any): Observable<any> {
    let api = `${this.apiUrl}/user-profile/${id}`;
    return this.http.get(api).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(msg));
  }
}
