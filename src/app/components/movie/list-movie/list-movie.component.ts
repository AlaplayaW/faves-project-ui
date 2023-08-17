import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../services/movie.service';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { Movie } from 'src/app/shared/models/movie.model';
import { Observable } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-list-movie',
  standalone: true,
  imports: [CommonModule, CardModule, AvatarModule, ImageModule],
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.scss']
})
export class ListMovieComponent {

  movieService = inject(MovieService);
  router = inject(Router);

  movies$!: Observable<Movie[]>;

  ngOnInit(): void {
    this.loadMovies();
  }

  private loadMovies(page?: number) {
    this.movies$ = this.movieService.getMovies();
  }


}
