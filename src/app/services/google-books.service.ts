import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { GoogleBook } from '../models/google-book.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {
  http = inject(HttpClient);

  private cache: { [query: string]: GoogleBook[] } = {};
  private apiUrl: string;

  constructor() {
    this.apiUrl = environment.apiUrl + '/google-books/search';
  }

  searchBooks(query$: Observable<string>): Observable<GoogleBook[]> {
    return query$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        if (this.cache[query]) {
          // Si les résultats sont en cache, on les retourne depuis le cache,
          // ce qui limite la quantité d'appels à l'API
          console.log(this.cache[query]);
          return of(
            this.cache[query].filter(
              (book) =>
                book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.thumbnail
            )
          );
        } else {
          const params = {
            title: query,
          };
          return this.http.get<GoogleBook[]>(this.apiUrl, { params }).pipe(
            map((response) => response || []),
            tap((response) => console.log(response)),
            tap((response) => (this.cache[query] = response)),
            catchError((error: any) => {
              console.error('Error occurred:', error);
              return of([]);
            })
          );
        }
      })
    );
  }
}
