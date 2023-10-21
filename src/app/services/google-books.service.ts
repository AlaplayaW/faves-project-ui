import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
} from 'rxjs';
import { GoogleBook } from '../models/google-book.model';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';
import { Media } from '../models/media.model';

@Injectable({
  providedIn: 'root',
})
export class GoogleBooksService {
  http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/google-books/search';

  searchBooks(queryObservable: Observable<string>): Observable<GoogleBook[]> {
    return queryObservable.pipe(
      debounceTime(500), // 0,5 seconde
      distinctUntilChanged(),
      filter((query) => query.trim().length > 2), // Ignore les requêtes de mois de 3 caractères
      switchMap((query) => {
        const params = { title: query };
        return this.http.get<GoogleBook[]>(this.apiUrl, { params }).pipe(
          map((response) => response || []),
          catchError((error: any) => {
            console.error('Une erreur est survenue :', error);
            return of([]); // Retourne un tableau vide en cas d'erreur
          })
        );
      })
    );
  }

  convertGoogleBookToBook(googleBook: GoogleBook): Book {
    const media: Media = {
      imageUrl: googleBook.volumeInfo.imageLinks?.smallThumbnail ?? '',
    };
    const industryIdentifier = googleBook.volumeInfo?.industryIdentifiers?.[0];
    const isbn = industryIdentifier ? industryIdentifier.identifier : '';

    const book: Book = {
      title: googleBook.volumeInfo.title,
      subtitle: googleBook.volumeInfo.subtitle,
      authors: googleBook.volumeInfo.authors ?? [''],
      pageCount: googleBook.volumeInfo.pageCount,
      isbn: isbn,
      publisher: googleBook.volumeInfo.publisher,
      printType: googleBook.volumeInfo.printType,
      publishedDate: new Date(googleBook.volumeInfo.publishedDate),
      description: googleBook.volumeInfo.description,
      media: media,
    };

    return book;
  }
}
