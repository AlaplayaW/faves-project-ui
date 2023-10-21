import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, map, of } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { FeedCardComponent } from '../../feed-card/feed-card.component';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [CommonModule, TabMenuModule, InputTextModule, FeedCardComponent],
  templateUrl: './news-feed.component.html',
  styleUrls: []
})
export class NewsFeedComponent implements OnInit {

  networkService = inject(NetworkService);

  searchQuery: string;
  books$!: Observable<Book[]>;
  filteredBooks$: Observable<Book[]>
  searchTerms = new Subject<string>();

  constructor() {
    this.books$ = this.loadFeed();
  }

  ngOnInit(): void {
    this.filteredBooks$ = this.books$;
    this.books$.subscribe(data => {
      console.log('Contenu de l\'Observable :');
      console.log(data);
    });
    // Utilise le flux searchTerms pour réagir aux changements dans les termes de recherche
    this.searchTerms.pipe(
      debounceTime(300), // Attendre 0,3 s avant de déclencher la recherche
      distinctUntilChanged(), // Ne déclenche la recherche que si les termes sont différents
    ).subscribe(term => {
      this.searchQuery = term;
      this.updateFilteredBooks();
    });
  }

  private updateFilteredBooks(): void {
    const searchQueryLower = this.removeAccents(this.searchQuery?.toLowerCase()) || '';
    this.filteredBooks$ = this.books$.pipe(
      map(books =>
        searchQueryLower
          ? books.filter(
            book => {
              const userPseudo = this.removeAccents(book.user?.pseudo?.toLowerCase()) || '';
              const title = this.removeAccents(book.title?.toLowerCase()) || '';

              return userPseudo.includes(searchQueryLower) || title.includes(searchQueryLower);
            }
          )
          : books
      )
    );
  }

  private loadFeed(page?: number): Observable<Book[]> {
    return this.networkService.getNetworkBooks().pipe(
      catchError(error => {
        console.error('Error loading books:', error);
        return of([]);
      })
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  removeAccents(str: string | undefined): string {
    if (str === undefined) {
      return '';
    }
    return str
      .normalize('NFD') // Normalise la chaîne en utilisant la Forme de Normalisation Unicode D (NFD)
      .replace(/[\u0300-\u036f]/g, ''); // Supprime les accents
  }

}
