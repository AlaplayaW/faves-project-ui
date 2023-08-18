import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, map, of } from 'rxjs';
import { NetworkService } from 'src/app/services/network.service';
import { ItemCardComponent } from 'src/app/shared/components/item-card/item-card.component';
import { Review } from 'src/app/shared/models/review.model';

@Component({
  selector: 'app-list-review',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.scss']
})
export class ListReviewComponent implements OnChanges, OnInit {
  networkService = inject(NetworkService);

  @Input() currentItemType: string | undefined;
  @Input() searchTerms: Subject<string>;
  searchQuery: string;

  reviews$!: Observable<Review[]>;
  filteredReviews$: Observable<Review[]>;

  constructor() {
    this.reviews$ = this.loadReviews();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Technique de destructuration. 
    // Permet d'extraire les propriétés d'un objet dans des variables distinctes 
    // avec le même nom que les propriétés.
    const { currentItemType } = changes;
    console.log('changes :', changes);

    if (currentItemType) {
      this.updateFilteredReviews(currentItemType.currentValue);
    }
  }

  ngOnInit(): void {
    this.filteredReviews$ = this.reviews$;
    // Utiliser le flux searchTerms pour réagir aux changements dans les termes de recherche
    this.searchTerms.pipe(
      debounceTime(300), // Attendre 300 ms avant de déclencher la recherche
      distinctUntilChanged(), // Ne déclencher la recherche que si les termes sont différents
    ).subscribe(term => {
      this.searchQuery = term; // Mettre à jour la variable searchQuery
      this.updateFilteredReviews(this.currentItemType); // Mettre à jour les avis filtrés
    });
  }

  private loadReviews(page?: number): Observable<Review[]> {
    return this.networkService.getNetworkReviews().pipe(
      catchError(error => {
        console.error('Error loading reviews:', error);
        return of([]);
      })
    );
  }

  private updateFilteredReviews(selectedItemType: string | undefined): void {
    this.filteredReviews$ = this.reviews$.pipe(
      map(reviews => {
        if (!this.searchQuery) {
          return (selectedItemType === 'all') ? reviews : reviews.filter(review => review.item?.mediaType === selectedItemType);
        } else {
          const searchQueryLower = this.searchQuery.toLowerCase();
          return reviews.filter(
            review =>
              (selectedItemType === 'all' || review.item?.mediaType === selectedItemType) &&
              (review.postedBy?.userName?.toLowerCase().includes(searchQueryLower) ||
               review.item?.title?.toLowerCase().includes(searchQueryLower))
          );
        }
      })
    );
  }

}
