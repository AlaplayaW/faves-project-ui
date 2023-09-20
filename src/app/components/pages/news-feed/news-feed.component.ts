import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, map, of } from 'rxjs';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { FeedCardComponent } from '../../feed-card/feed-card.component';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [CommonModule, TabMenuModule, InputTextModule, FeedCardComponent],
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

  bookService = inject(BookService);
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
      console.log(data); // Affichez les données dans la console
    });
    // Utiliser le flux searchTerms pour réagir aux changements dans les termes de recherche
    this.searchTerms.pipe(
      debounceTime(300), // Attendre 300 ms avant de déclencher la recherche
      distinctUntilChanged(), // Ne déclencher la recherche que si les termes sont différents
    ).subscribe(term => {
      this.searchQuery = term; // Mettre à jour la variable searchQuery
      this.updateFilteredBooks(); // Mettre à jour les avis filtrés
    });
  }

  // Mettre à jour les avis filtrés
  private updateFilteredBooks(): void {
    const searchQueryLower = this.searchQuery?.toLowerCase() || '';
    this.filteredBooks$ = this.books$.pipe(
      map(books =>
        searchQueryLower
          ? books.filter(
              book =>
                (book.user?.pseudo?.toLowerCase().includes(searchQueryLower) ||
                  book.title?.toLowerCase().includes(searchQueryLower))
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
    console.log(term);
  }

}
