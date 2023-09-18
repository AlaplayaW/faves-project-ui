import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Review } from '../shared/models/review.model';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';



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

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl + '/api/network';
    this.loadReviews();
    this.loadFriends();
  }


  getNetworkFriends(): Observable<User[]> {
    return this.friendsSubject.asObservable();
  }

  getNetworkReviews(): Observable<Review[]> {
    return this.reviewsSubject.asObservable();
  }


  private loadReviews(){
    this.http.get<Review[]>(this.apiUrl + '/friends/reviews', httpOptions).subscribe({
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