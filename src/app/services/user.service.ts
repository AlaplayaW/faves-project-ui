import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string;
  private usersSubject = new BehaviorSubject<User[]>([]);

  user: User;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/users';
    this.loadUsers();
  }

  getCurrentUser(): User | null {
    const userJson: string | null = localStorage.getItem('user');
    if (userJson === null) {
      return null;
    }
    return JSON.parse(userJson);
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
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

  private loadUsers() {
    this.http.get<{ 'hydra:member': User[] }>(this.apiUrl).subscribe({
      next: (response) => {
        const users = response['hydra:member'];
        this.usersSubject.next(users);
      },
      error: (error) => console.error(error),
    });
  }
}
