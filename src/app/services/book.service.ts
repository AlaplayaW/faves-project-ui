import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';
import { FriendshipService } from './friendship.service';
import { UserService } from './user.service';
import { CreateBookDto } from '../models/createBookDto.model';
import { ReviewService } from './review.service';
import { Utils } from './utils';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  friendshipService = inject(FriendshipService);
  userService = inject(UserService);
  reviewService = inject(ReviewService);

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/books';
  }

  getFilteredBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + `?title=${query}`);
  }

  createBook(book: CreateBookDto): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book).pipe(
      tap((response) => Utils.log(response)),
      catchError((error) => Utils.handleError(error, undefined))
    );
  }

}
