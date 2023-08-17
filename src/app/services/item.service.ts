import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, mapTo, of, tap } from 'rxjs';
import { Item } from '../shared/models/item.model';
import { environment } from 'src/environments/environment';
import { FriendshipService } from './friendship.service';
import { User } from '../shared/models/user.model';
import { UserService } from './user.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json' // Pour une réponse JSON
  })
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  friendshipService = inject(FriendshipService);
  userService = inject(UserService);

  private apiUrl: string;
  private itemsSubject = new BehaviorSubject<Item[]>([]);

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl + '/items';
    this.loadItems();
  }

  getItems(): Observable<Item[]> {
    return this.itemsSubject.asObservable();
  }

  getItemsByUser(userId: number): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl + '?&postedBy=' + userId);
  }

  getBooks(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl + '?mediaType=book');
  }

  getBooksByUser(userId: number): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl + '?mediaType=book&postedBy=' + userId);
  }

  getItemsByFriends(userId: number): Observable<Item[]> {
    const friendIds = this.userService.getUserFriends(userId).pipe(
      map((friends: User[]) => {
        return friends.map((friend: User) => friend.id);
      })
    ) ;
    return this.http.get<Item[]>(this.apiUrl + '?&postedBy=' + friendIds);
  }


  private loadItems(){
    this.http.get<Item[]>(this.apiUrl, httpOptions).subscribe({
      next: items => {
        console.log(items);
        this.itemsSubject.next(items);
      },
    // next: response => {
    //   const items = response['hydra:member'];
    //   console.log(items);
    //   this.itemsSubject.next(items);
    // },
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

  // Interface pour la réponse Hydra contenant les métadonnées
// export interface HydraResponse<T> {
//   '@context': string;
//   '@id': string;
//   '@type': string;
//   'hydra:member': T[];
//   // Autres propriétés Hydra si nécessaire
// }