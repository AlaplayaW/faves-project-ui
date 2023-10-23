import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Book } from '../models/book.model';
import { Friendship } from '../models/friendship.model';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private http = inject(HttpClient);

  private apiUrl: string;
  private reviewsSubject = new BehaviorSubject<Review[]>([]);
  private friendsSubject = new BehaviorSubject<User[]>([]);
  private booksSubject = new BehaviorSubject<Book[]>([]);

  constructor() {
    this.apiUrl = environment.apiUrl + '/network';
  }

  getNetworkFriends(): Observable<User[]> {
    this.loadFriendsByNetwork();
    return this.friendsSubject.asObservable();
  }

  getNetworkReviews(): Observable<Review[]> {
    this.loadReviewsByNetwork();
    return this.reviewsSubject.asObservable();
  }

  getNetworkBooks(): Observable<Book[]> {
    this.loadBooksByNetwork();
    return this.booksSubject.asObservable();
  }

  getAllUserFriendships(): Observable<Friendship[]> {
    return this.http.get<Friendship[]>(this.apiUrl + '/all-friends');
  }

  private loadBooksByNetwork() {
    this.http.get<Book[]>(this.apiUrl + '/books').subscribe({
      next: (books) => {
        this.booksSubject.next(books);
      },
      error: (error) => console.error(error),
    });
  }

  private loadReviewsByNetwork() {
    this.http.get<Review[]>(this.apiUrl + '/reviews').subscribe({
      next: (reviews) => {
        this.reviewsSubject.next(reviews);
      },
      error: (error) => console.error(error),
    });
  }

  private loadFriendsByNetwork() {
    this.http.get<User[]>(this.apiUrl + '/friends').subscribe({
      next: (friends) => {
        this.friendsSubject.next(friends);
      },
      error: (error) => console.error(error),
    });
  }
}
