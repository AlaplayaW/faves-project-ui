import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { Book } from '../shared/models/book.model';
import { environment } from 'src/environments/environment';
import { FriendshipService } from './friendship.service';
import { UserService } from './user.service';
import { CreateBookDto } from '../shared/models/createBookDto.model';
import { ReviewService } from './review.service';
import { Review } from '../shared/models/review.model';
import { User } from '../shared/models/user.model';
import { Utils } from './utils';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json' // Pour une réponse JSON
  })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

  friendshipService = inject(FriendshipService);
  userService = inject(UserService);
  reviewService = inject(ReviewService);

  private apiUrl: string;
  // private booksSubject = new BehaviorSubject<Book[]>([]);
  private booksAndReviewsSubject = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/api/books'; //items?page=1&user.id=5
    // this.loadBooks();
    // this.loadBooksAndReviewsByFriends();
  }

  // getBooksWithReviews(): Observable<Book[]> {
  //   return this.booksAndReviewsSubject.asObservable();
  // }

  getFilteredBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + `?title=${query}`, httpOptions);
  }

  // getReviewsByBookId(id: number): Observable<Review[]> {
  //   return this.booksAndReviewsSubject.pipe(
  //     map(books => {
  //       const book = books.find(b => b.id === id);
  //       return book ? book.reviews : [];
  //     })
  //   );
  // }
  // getReviewsByBookId(id: number): Observable<Review[]> {
  //   return this.booksAndReviewsSubject.pipe(
  //     map(books => {
  //       const book = books.find(b => b.id === id);
  //       return book ? book.reviews : [];
  //     }),
  //     switchMap(reviews => {
  //       const detailedReviewsObservables = reviews.map(review => this.reviewService.getReviewDetails(review.toString()));
  //       return forkJoin(detailedReviewsObservables);
  //     })
  //   );
  // }

  createBook(book: CreateBookDto): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, httpOptions).pipe(
      tap((response) => Utils.log(response)),
      catchError((error) => Utils.handleError(error, undefined))
    );
  }


  // getBooks(): Observable<Book[]> {
  //   return this.booksSubject.asObservable();
  // }


  // private loadBooks() {
  //   this.http.get<{ 'hydra:member': Book[] }>(this.apiUrl).subscribe({
  //     next: response => {
  //       const books = response['hydra:member'];
  //       console.log(books);
  //       this.booksSubject.next(books);
  //     },
  //     error: error => console.error(error),
  //   });
  // }



  // private loadBooks(){
  //   this.http.get<Book[]>(this.apiUrl, httpOptions).subscribe({
  //     next: books => {
  //       console.log(books);
  //       this.booksSubject.next(books);
  //     },
  //   // next: response => {
  //   //   const books = response['hydra:member'];
  //   //   console.log(books);
  //   //   this.booksSubject.next(books);
  //   // },
  //     error: error => console.error(error),
  //   });
  // }

  // getBooksByFriends(userId: number): Observable<Book[]> {
  //   const friendIds = this.userService.getUserFriends(userId).pipe(
  //     map((friends: User[]) => {
  //       return friends.map((friend: User) => friend.id);
  //     })
  //   ) ;
  //   return this.http.get<Book[]>(this.apiUrl + '?&user=' + friendIds);
  // }


}
