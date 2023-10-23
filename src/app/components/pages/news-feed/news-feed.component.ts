import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import {
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  of,
} from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { FeedCardComponent } from '../../feed-card/feed-card.component';
import { NetworkService } from 'src/app/services/network.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [
    CommonModule,
    TabMenuModule,
    InputTextModule,
    FeedCardComponent,
    ButtonModule,
  ],
  templateUrl: './news-feed.component.html',
  styleUrls: [],
})
export class NewsFeedComponent implements OnInit {
  networkService = inject(NetworkService);

  books$!: Observable<Book[]>;
  searchTerms = new Subject<string>();
  searchQuery: string;
  isLoading = true;

  ngOnInit(): void {
    this.loadFeed();

    this.searchTerms
      .pipe(
        debounceTime(300), // Attendre 0,3 s avant de déclencher la recherche
        distinctUntilChanged() // Ne déclenche la recherche que si les termes sont différents
      )
      .subscribe((term) => {
        this.searchQuery = term;
        this.updateFilteredBooks();
      });
  }

  private updateFilteredBooks(): void {
    const searchQueryLower =
      this.removeAccents(this.searchQuery?.toLowerCase()) || '';
    this.books$ = this.books$.pipe(
      map((books) =>
        searchQueryLower
          ? books.filter((book) => {
              const userPseudo =
                this.removeAccents(book.user?.pseudo?.toLowerCase()) || '';
              const title = this.removeAccents(book.title?.toLowerCase()) || '';

              return (
                userPseudo.includes(searchQueryLower) ||
                title.includes(searchQueryLower)
              );
            })
          : books
      )
    );
  }

  private loadFeed(page?: number): any {
    this.networkService.getNetworkBooks().subscribe((books) => {
      console.log('books: -- ', books);
      this.books$ = of(books);
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
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
