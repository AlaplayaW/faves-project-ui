import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Book } from '../models/book.model';

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
    this.loadFriendsByNetwork();
    this.loadBooksByNetwork();
    this.loadReviewsByNetwork();
  }

  getNetworkFriends(): Observable<User[]> {
    return this.friendsSubject.asObservable();
  }

  getNetworkReviews(): Observable<Review[]> {
    return this.reviewsSubject.asObservable();
  }

  getNetworkBooks(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  private loadBooksByNetwork() {
    this.http.get<Book[]>(this.apiUrl + '/books').subscribe({
      next: (books) => {
        // console.log(books);
        this.booksSubject.next(books);
      },
      error: (error) => console.error(error),
    });
  }

  private loadReviewsByNetwork() {
    this.http.get<Review[]>(this.apiUrl + '/reviews').subscribe({
      next: (reviews) => {
        // console.log(reviews);
        this.reviewsSubject.next(reviews);
      },
      error: (error) => console.error(error),
    });
  }

  private loadFriendsByNetwork() {
    this.http.get<User[]>(this.apiUrl + '/friends').subscribe({
      next: (friends) => {
        // console.log(friends);
        this.friendsSubject.next(friends);
      },
      error: (error) => console.error(error),
    });
  }
}
