import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Review } from '../models/review.model';
import { environment } from 'src/environments/environment';
import { Utils } from './utils';



@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl: string;
  private reviewsSubject = new BehaviorSubject<Review[]>([]);

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/reviews';
    this.loadReviews();
  }

  // TODO: A supprimer ou non
  // getReviews(): Observable<Review[]> {
  //   return this.reviewsSubject.asObservable();
  // }

  // getReviewsByUser(userId: number): Observable<Review[]> {
  //   return this.http.get<Review[]>(this.apiUrl + '?&user=' + userId);
  // }

  // getReviewsByFriends(): Observable<Review[]> {
  //   return this.http.get<Review[]>(environment.apiUrl + '/network/friends/reviews');
  // }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review).pipe(
      tap((response) => Utils.log(response)),
      catchError((error) => Utils.handleError(error, undefined))
    );
  }

  private loadReviews() {
    this.http.get<Review[]>(this.apiUrl).subscribe({
      next: reviews => {
        this.reviewsSubject.next(reviews);
      },
      error: error => console.error(error),
    });
  }

}