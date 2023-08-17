import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Book } from '../shared/models/book.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl: string;
  private booksSubject = new BehaviorSubject<Book[]>([]);
  // private booksSubject = new ReplaySubject<Book[]>(1);

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl + '/items?mediaType=book'; //items?page=1&postedBy.id=5
    this.loadBooks();
  }

  getBooks(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  getBooksByUser(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  private loadBooks(){
    this.http.get<{ 'hydra:member': Book[] }>(this.apiUrl).subscribe({
    next: response => {
      const books = response['hydra:member'];
      console.log(books);
      this.booksSubject.next(books);
    },
      error: error => console.error(error),
    });
  }


  // getBookList(url: string): Observable<object> {
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
