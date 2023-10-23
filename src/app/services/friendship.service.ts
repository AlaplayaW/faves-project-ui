import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Friendship } from '../models/friendship.model';

@Injectable({
  providedIn: 'root',
})
export class FriendshipService {
  private apiUrl: string;
  private friendshipSubject = new BehaviorSubject<Friendship[]>([]);

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/friendships';
    this.loadFriendships();
  }

  getFriendships(): Observable<Friendship[]> {
    return this.friendshipSubject.asObservable();
  }

  private loadFriendships() {
    this.http.get<Friendship[]>(this.apiUrl).subscribe({
      next: (friends) => {
        console.log(friends);
        this.friendshipSubject.next(friends);
      },
      error: (error) => console.error(error),
    });
  }

  getFriendshipsByUser(userId: number): Observable<Friendship[]> {
    return this.http.get<Friendship[]>(this.apiUrl + '?&user=' + userId);
  }

  getFriendsByUser(userId: number): Observable<Friendship[]> {
    return this.http.get<Friendship[]>(
      this.apiUrl + '?isAccepted=true&userId=' + userId
    );
  }
}
