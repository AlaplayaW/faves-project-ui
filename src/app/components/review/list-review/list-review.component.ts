import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, map, of } from 'rxjs';
import { NetworkService } from 'src/app/services/network.service';
import { ReviewCardComponent } from 'src/app/components/review-card/review-card.component';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-list-review',
  standalone: true,
  imports: [CommonModule, ReviewCardComponent],
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.scss']
})
export class ListReviewComponent implements OnInit {
  networkService = inject(NetworkService);

  @Input() searchTerms: Subject<string>;
  searchQuery: string;

  reviews$!: Observable<Review[]>;
  filteredReviews$: Observable<Review[]>;

  constructor() {
    this.reviews$ = this.loadReviews();
  }

  ngOnInit(): void {
    this.filteredReviews$ = this.reviews$;
    // Utiliser le flux searchTerms pour réagir aux changements dans les termes de recherche
    this.searchTerms.pipe(
      debounceTime(300), // Attendre 300 ms avant de déclencher la recherche
      distinctUntilChanged(), // Ne déclencher la recherche que si les termes sont différents
    ).subscribe(term => {
      this.searchQuery = term; // Mettre à jour la variable searchQuery
      // this.updateFilteredReviews(this.currentBookType); // Mettre à jour les avis filtrés
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

  // private updateFilteredReviews(selectedBookType: string | undefined): void {
  //   this.filteredReviews$ = this.reviews$.pipe(
  //     map(reviews => {
  //       if (!this.searchQuery) {
  //         return (selectedBookType === 'all') ? reviews : reviews.filter(review => review.book?.mediaType === selectedBookType);
  //       } else {
  //         const searchQueryLower = this.searchQuery.toLowerCase();
  //         return reviews.filter(
  //           review =>
  //             (selectedBookType === 'all' || review.book?.mediaType === selectedBookType) &&
  //             (review.user?.userName?.toLowerCase().includes(searchQueryLower) ||
  //              review.book?.title?.toLowerCase().includes(searchQueryLower))
  //         );
  //       }
  //     })
  //   );
  // }

}
