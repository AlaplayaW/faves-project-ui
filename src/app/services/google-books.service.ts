import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
import { GoogleBook } from '../models/google-book.model';



@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  http = inject(HttpClient);

  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';
  private API_KEY = "AIzaSyBBks0tZoY2KKlmmltbqgy7jjqmwgzSPaU";
  private cache: { [query: string]: GoogleBook[] } = {};

  searchBooks(query$: Observable<string>): Observable<any[]> {
    return query$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (this.cache[query]) {
          // Si les résultats sont en cache, on les retourne depuis le cache, 
          // ce qui limite la quantité d'appels à l'API
          return of(this.cache[query]);
        } else {
          const params = {
            q: query,
            key: this.API_KEY
          };
          return this.http.get<{ items: GoogleBook[] }>(this.API_PATH, { params })
          .pipe(
            map(books => books.items || []),
            tap(books => this.cache[query] = books)
          );
        }
      })
    );
  }
}
