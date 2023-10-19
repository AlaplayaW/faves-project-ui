import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
import { GoogleBook } from '../models/google-book.model';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  http = inject(HttpClient);

  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';
  private API_KEY = "AIzaSyBBks0tZoY2KKlmmltbqgy7jjqmwgzSPaU";
  private cache: { [query: string]: GoogleBook[] } = {};
  private apiUrl: string;


  // constructor(private http: HttpClient) {
  //   this.apiUrl = environment.apiUrl + '/google-books/search';
  // }


  searchBooks(query$: Observable<string>): Observable<any[]> {
    return query$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (this.cache[query]) {
          // Si les résultats sont en cache, on les retourne depuis le cache, 
          // ce qui limite la quantité d'appels à l'API
          console.log(this.cache[query]);
          return of(this.cache[query].filter(book => book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail));

        } else {
          const params = {
            q: query,
            key: this.API_KEY
          };
          return this.http.get<{ items: GoogleBook[] }>(this.API_PATH, { params })
          // return this.http.get<{ items: GoogleBook[] }>(this.apiUrl, { params })
          .pipe(
            map(books => books.items || []),
            map(books => books.filter(book => book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail)),
            tap(books => console.log(books)),
            tap(books => this.cache[query] = books)
          );
        }
      })
    );
  }
}
