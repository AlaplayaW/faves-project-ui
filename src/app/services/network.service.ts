import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Review } from '../shared/models/review.model';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';
import { Book } from '../shared/models/book.model';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json' // Pour une réponse JSON
  })
};

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private apiUrl: string;
  private reviewsSubject = new BehaviorSubject<Review[]>([]);
  private friendsSubject = new BehaviorSubject<User[]>([]);
  private booksSubject = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl + '/api/network';
    this.loadReviews();
    this.loadFriends();
    this.loadBooksByNetwork();
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

  private loadReviews(){
    this.http.get<Review[]>(this.apiUrl + '/reviews', httpOptions).subscribe({
      next: reviews => {
        console.log(reviews);
        this.reviewsSubject.next(reviews);
      },
      error: error => console.error(error),
    });
  }

  private loadFriends(){
    this.http.get<User[]>(this.apiUrl + '/friends', httpOptions).subscribe({
      next: friends => {
        console.log(friends);
        this.friendsSubject.next(friends);
      },
      error: error => console.error(error),
    });
  }

    private loadBooksByNetwork(){
    this.http.get<Book[]>(this.apiUrl + '/books', httpOptions).subscribe({
      next: books => {
        console.log(books);
        this.booksSubject.next(books);
      },
      error: error => console.error(error),
    });
  }

  // getReviewList(url: string): Observable<object> {
  //   return this.http.get(url, httpOptions).pipe(
  //     tap((response) => this.log(response)),
  //     catchError((error) => this.handleError(error, []))
  //   );
  // }
  // private log(response: any) {
  //   console.table(response);
  // }

  // private handleError(error: Error, errorValue: any) {
  //   console.error(error);
  //   return of(errorValue);
  // }
}