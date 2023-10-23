import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';
import { FriendshipService } from './friendship.service';
import { UserService } from './user.service';
import { ReviewService } from './review.service';
import { Utils } from './utils';
import { Media } from '../models/media.model';

@Injectable({
  providedIn: 'root',
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

  createMedia(mediaData: Media): Observable<Media> {
    return this.http.post<Media>(environment.apiUrl + '/medias', mediaData);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book).pipe(
      tap((response) => Utils.log(response)),
      catchError((error) => Utils.handleError(error, undefined))
    );
  }
}
