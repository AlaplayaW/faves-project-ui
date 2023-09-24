import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';

// const defaultUser = null;

@Injectable({ providedIn: 'root' })
export class AuthService {

  // public user$ = new BehaviorSubject(defaultUser);
  
  constructor(private http: HttpClient, public router: Router) {}

  endpoint: string = `${environment.apiUrl}/api` ;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/users`;
    console.log('Tentative d\'inscription avec les données suivantes :', user); // Ajout du console.log
    return this.http.post(api, user,{ headers: this.headers }).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user, { headers: this.headers })
      .subscribe((res: any) => {
        localStorage.setItem('jwt', JSON.stringify(res.token));
        this.router.navigate(['/app/feed']);

        // this.getUserProfile(res._id).subscribe((res) => {
        //   this.currentUser = res;
        //   this.router.navigate(['feed/' + res.msg._id]);
        // });
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
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  // handleError(error: HttpErrorResponse) {
  //   let msg = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     msg = error.error.message;
  //   } else {
  //     // server-side error
  //     msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   return throwError(() => new Error(msg));
  // }

  handleError(error: HttpErrorResponse) {
    console.error('Erreur lors de la requête :', error); // Ajout du console.log
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      msg = error.error.message;
    } else {
      // Erreur côté serveur
      msg = `Erreur Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(msg));
  }
}

    // login(username: string, password: string): Observable<any> {
  //   this.http.post(`${environment.apiUrl}/api/login`, { username, password })
  //     .pipe(
  //       catchError(error => {
  //         console.error('Erreur de connexion :', error);
  //         return throwError(() => new Error ('Erreur de connexion'));
  //       }),
  //       map(response => {
  //         if (response) {
  //           localStorage.setItem('jwt', JSON.stringify(response));
  //           console.log('Connexion réussie !');
  //         }
  //       }),
  //     )
  //     .subscribe();
  // }



