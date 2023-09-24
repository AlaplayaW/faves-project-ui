import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, mapTo, of, tap } from 'rxjs';
import { Review } from '../shared/models/review.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  // friendshipService = inject(FriendshipService);
  // userService = inject(UserService);

  private apiUrl: string;
  private reviewsSubject = new BehaviorSubject<Review[]>([]);

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl + '/api/reviews';
    this.loadReviews();
  }

  getReviews(): Observable<Review[]> {
    return this.reviewsSubject.asObservable();
  }

  getReviewsByUser(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl + '?&user=' + userId);
  }

  // getReviewsById(id: number): Observable<Review[]> {
  //   return this.http.get<Review[]>(this.apiUrl + '/' + id);
  // }

    // on utilise l'URI
    getReviewDetails(reviewUrl: string): Observable<Review> {
      return this.http.get<Review>(`${environment.apiUrl}${reviewUrl}`);
    }

  // getBooks(): Observable<Review[]> {
  //   return this.http.get<Review[]>(this.apiUrl + '?mediaType=book');
  // }

  // getBooksByUser(userId: number): Observable<Review[]> {
  //   return this.http.get<Review[]>(this.apiUrl + '?mediaType=book&user=' + userId);
  // }

  getReviewsByFriends(): Observable<Review[]> {
    return this.http.get<Review[]>(environment.apiUrl + '/network/friends/reviews');
  }

  createReview(review: Review): Observable<Review> {
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };
    return this.http.post<Review>(this.apiUrl, review).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  private loadReviews(){
    this.http.get<Review[]>(this.apiUrl).subscribe({
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