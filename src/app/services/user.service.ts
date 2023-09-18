import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json' // Pour une réponse JSON
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string;
  private usersSubject = new BehaviorSubject<User[]>([]);
  // private usersSubject = new ReplaySubject<User[]>(1);


  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl + '/api/users';
    this.loadUsers();
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  getUserFriends(userId: number): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/' + userId + '/friends');
  }

  private loadUsers(){
    this.http.get<User[]>(this.apiUrl, httpOptions).subscribe({
    next: users => {
      console.log(users);
      this.usersSubject.next(users);
    },
      error: error => console.error(error),
    });
  }


  // getAllusers(page?: number) {
  //   let pageParam = undefined;
  //   if (page) pageParam = `/?&page=${page}`
  //   return this.http.get<User[]>(`${this.apiUrl}/users${pageParam}`);
  // }
  getAllusers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // on utilise l'URI
  getUserDetails(userUrl: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}${userUrl}`);
  }
  
  getUserById(userId: string) {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  saveEditUser(userId: string, user: User) {
    return this.http.patch(`${this.apiUrl}/${userId}`, user);
  }

  saveUser(user: User) {
    return this.http.post(`${this.apiUrl}/`, user);
  }

  deleteUserById(userId: string) {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
