import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, mapTo, of, tap } from 'rxjs';
import { Review } from '../shared/models/review.model';
import { environment } from 'src/environments/environment';
import { FriendshipService } from './friendship.service';
import { User } from '../shared/models/user.model';
import { UserService } from './user.service';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json' // Pour une réponse JSON
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  // friendshipService = inject(FriendshipService);
  // userService = inject(UserService);

  private apiUrl: string;
  private reviewsSubject = new BehaviorSubject<Review[]>([]);

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl + '/reviews';
    this.loadReviews();
  }

  getReviews(): Observable<Review[]> {
    return this.reviewsSubject.asObservable();
  }

  getReviewsByUser(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl + '?&postedBy=' + userId);
  }

  // getBooks(): Observable<Review[]> {
  //   return this.http.get<Review[]>(this.apiUrl + '?mediaType=book');
  // }

  // getBooksByUser(userId: number): Observable<Review[]> {
  //   return this.http.get<Review[]>(this.apiUrl + '?mediaType=book&postedBy=' + userId);
  // }

  getReviewsByFriends(): Observable<Review[]> {
    return this.http.get<Review[]>(environment.apiUrl + '/network/friends/reviews');
  }

  createReview(review: Review): Observable<Review> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Review>(this.apiUrl, review, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  private loadReviews(){
    this.http.get<Review[]>(this.apiUrl, httpOptions).subscribe({
      next: reviews => {
        console.log(reviews);
        this.reviewsSubject.next(reviews);
      },
    // next: response => {
    //   const reviews = response['hydra:member'];
    //   console.log(reviews);
    //   this.reviewsSubject.next(reviews);
    // },
      error: error => console.error(error),
    });
  }


  // getReviewList(url: string): Observable<object> {
  //   return this.http.get(url, httpOptions).pipe(
  //     tap((response) => this.log(response)),
  //     catchError((error) => this.handleError(error, []))
  //   );
  // }
  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}