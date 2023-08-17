import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Movie } from '../shared/models/movie.model';
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
export class MovieService {

  private apiUrl: string;
  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  // private moviesSubject = new ReplaySubject<Movie[]>(1);

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl + '/movies';
    this.loadMovies();
  }

  getMovies(): Observable<Movie[]> {
    return this.moviesSubject.asObservable();
  }

  private loadMovies(){
    this.http.get<{ 'hydra:member': Movie[] }>(this.apiUrl).subscribe({
    next: response => {
      const movies = response['hydra:member'];
      console.log(movies);
      this.moviesSubject.next(movies);
    },
      error: error => console.error(error),
    });
  }


  // getMovieList(url: string): Observable<object> {
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
