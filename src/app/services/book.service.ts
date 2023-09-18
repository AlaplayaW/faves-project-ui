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
    this.loadBooksAndReviewsByFriends();
  }

  getBooksWithReviews(): Observable<Book[]> {
    return this.booksAndReviewsSubject.asObservable();
  }

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
  getReviewsByBookId(id: number): Observable<Review[]> {
    return this.booksAndReviewsSubject.pipe(
      map(books => {
        const book = books.find(b => b.id === id);
        return book ? book.reviews : [];
      }),
      switchMap(reviews => {
        const detailedReviewsObservables = reviews.map(review => this.reviewService.getReviewDetails(review.toString()));
        return forkJoin(detailedReviewsObservables);
      })
    );
  }

  createBook(book: CreateBookDto): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
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

  private loadBooksAndReviewsByFriends() {
    this.http.get<Book[]>(this.apiUrl + '/reviews-by-friends', httpOptions).subscribe({
      next: books => {
        // Pour chaque livre, on récupère l'URL de l'utilisateur
        books.forEach(book => {
          const userUrl: User = book.user;
          const reviewUrls: Review[] = book.reviews;

          if (userUrl) {
            // Appelez la méthode getUserDetails avec l'URL
            this.userService.getUserDetails(userUrl.toString()).subscribe(user => {
              // Mettre à jour la propriété user du livre avec les détails de l'utilisateur
              book.user = user;
            });
          }
          // Si des critiques (reviews) sont associées au livre
        if (reviewUrls && reviewUrls.length > 0) {
          const reviews: Review[] = [];

          // Pour chaque URL de critique, appelez la méthode correspondante pour obtenir les détails de la critique
          reviewUrls.forEach(reviewUrl => {
            this.reviewService.getReviewDetails(reviewUrl.toString()).subscribe(review => {
              reviews.push(review);

              // Si nous avons obtenu les détails de toutes les critiques, mettez à jour la propriété reviews du livre
              if (reviews.length === reviewUrls.length) {
                book.reviews = reviews;

                // Si vous devez effectuer une action une fois que les critiques sont mises à jour, faites-le ici.
              }
            });
          });
        }
          // if (reviewUrl) {
          //   this.reviewService.getReviewDetails(reviewUrl.toString()).subscribe(reviews[] => {
          //     book.reviews = reviews[];
          //   });
          // }
        });
        // Mettre à jour le sujet
        this.booksAndReviewsSubject.next(books);
      },
      error: error => console.error(error),
    });
  }



  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

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

  // getBookList(url: string): Observable<object> {
  //   return this.http.get(url, httpOptions).pipe(
  //     tap((response) => this.log(response)),
  //     catchError((error) => this.handleError(error, []))
  //   );
  // }

  // getBooksByFriends(userId: number): Observable<Book[]> {
  //   const friendIds = this.userService.getUserFriends(userId).pipe(
  //     map((friends: User[]) => {
  //       return friends.map((friend: User) => friend.id);
  //     })
  //   ) ;
  //   return this.http.get<Book[]>(this.apiUrl + '?&user=' + friendIds);
  // }

  // getBooksByUser(userId: number): Observable<Book[]> {
  //   return this.http.get<Book[]>(this.apiUrl + '?mediaType=book&user=' + userId);
  // }
  // getBooksByUser(userId: number): Observable<Book[]> {
  //   return this.http.get<Book[]>(this.apiUrl + '?&user=' + userId);
  // }


}
