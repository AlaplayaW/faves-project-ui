import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string;
  private usersSubject = new BehaviorSubject<User[]>([]);


  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/users';
    this.loadUsers();
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  private loadUsers() {
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: users => {
        console.log(users);
        this.usersSubject.next(users);
      },
      error: error => console.error(error),
    });
  }

  getAllusers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
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
