import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Item } from '../shared/models/item.model';
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
export class FriendshipService {

  private apiUrl: string;
  private itemsSubject = new BehaviorSubject<Item[]>([]);

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl + '/friendships';
    this.loadItems();
  }

  getFriendships(): Observable<Item[]> {
    return this.itemsSubject.asObservable();
  }

  getFriendshipsByUser(userId: number): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl + '?&postedBy=' + userId);
  }

  // getFriendshipsSentByUser(): Observable<Item[]> {
  //   return this.http.get<Item[]>(this.apiUrl + '?mediaType=book');
  // }

  // getFriendshipsRecievedByUser(userId: number): Observable<Item[]> {
  //   return this.http.get<Item[]>(this.apiUrl + '?mediaType=book&postedBy=' + userId);
  // }

  getFriendsByUser(userId: number): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl + '?isAccepted=true&userId=' + userId);
  }


  private loadItems(){
    this.http.get<{ 'hydra:member': Item[] }>(this.apiUrl).subscribe({
    next: response => {
      const items = response['hydra:member'];
      console.log(items);
      this.itemsSubject.next(items);
    },
      error: error => console.error(error),
    });
  }

  // getItemList(url: string): Observable<object> {
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
