import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Review } from '../models/review.model';
import { environment } from 'src/environments/environment';
import { Utils } from './utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private router = inject(Router);
  private apiUrl: string;
  private reviewsSubject = new BehaviorSubject<Review[]>([]);

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/reviews';
    this.loadReviews();
  }

  createReview(review: any): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review).pipe(
      tap(() => this.router.navigate(['/app/feed'])),
      catchError((error) => Utils.handleError(error, undefined))
    );
  }

  private loadReviews() {
    this.http.get<Review[]>(this.apiUrl).subscribe({
      next: (reviews) => {
        this.reviewsSubject.next(reviews);
      },
      error: (error) => console.error(error),
    });
  }
}
