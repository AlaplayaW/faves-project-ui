import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { GoogleBook } from '../shared/models/google-book.model';



@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  http = inject(HttpClient);

  private API_PATH = 'https://www.googleapis.com/books/v1/volumes';


  search(query: string): Observable<GoogleBook[]> {
    return this.http
      .get<{ items: GoogleBook[] }>(`${this.API_PATH}?q=${query}`)
      .pipe(map(books => books.items || []));
  }

  searchBooks(query$: Observable<string>): Observable<any[]> {
    return query$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        const params = {
          q: query
        };
        return this.http.get<{ items: GoogleBook[] }>(this.API_PATH, { params });
      }),
      map((books) => {
        console.log(books.items)
        return books.items || [];
      })
    );
  }


  getById(volumeId: string): Observable<GoogleBook> {
    return this.http.get<GoogleBook>(`${this.API_PATH}/${volumeId}`);
  }
}
