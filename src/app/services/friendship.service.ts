import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  private apiUrl: string;
  private booksSubject = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl + '/friendships';
    // this.loadBooks();
  }

  getFriendships(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  getFriendshipsByUser(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '?&user=' + userId);
  }

  // getFriendshipsSentByUser(): Observable<Book[]> {
  //   return this.http.get<Book[]>(this.apiUrl + '?mediaType=book');
  // }

  // getFriendshipsRecievedByUser(userId: number): Observable<Book[]> {
  //   return this.http.get<Book[]>(this.apiUrl + '?mediaType=book&user=' + userId);
  // }

  getFriendsByUser(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl + '?isAccepted=true&userId=' + userId);
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
