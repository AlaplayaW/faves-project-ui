import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FriendshipService {
  private apiUrl: string;
  private booksSubject = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/friendships';
  }

  getFriendships(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  getFriendshipsByUser(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '?&user=' + userId);
  }

  getFriendsByUser(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(
      this.apiUrl + '?isAccepted=true&userId=' + userId
    );
  }
}
