import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { Observable } from 'rxjs';
import { NetworkService } from 'src/app/services/network.service';
import { StarRatingComponent } from 'src/app/shared/components/star-rating/star-rating.component';
import { Review } from 'src/app/shared/models/review.model';
import { TrimTextDirective } from 'src/app/shared/directives/trim-text.directive';

@Component({
  selector: 'app-list-review',
  standalone: true,
  imports: [CommonModule, CardModule, ImageModule, RatingModule, StarRatingComponent, TrimTextDirective],
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.scss']
})
export class ListReviewComponent {
  networkService = inject(NetworkService);

  @Input() itemType: string = "";
  reviews$!: Observable<Review[]>;

  ngOnInit(): void {
    this.loadReviews();
  }

  private loadReviews(page?: number) {
    this.reviews$ = this.networkService.getNetworkReviews();
  }

  getStarRating(note: number | undefined): string[] {
    const validNote = note || 0;
    const maxNote = 10; // Note maximale (10)
    const numberOfStars = 5; // Nombre d'étoiles
  
    const normalizedNote = (validNote / maxNote) * numberOfStars;
  
    const starArray: string[] = [];
  
    for (let i = 0; i < numberOfStars; i++) {
      if (i < normalizedNote) {
        starArray.push("full");
      } else if (i === Math.floor(normalizedNote) && normalizedNote % 1 > 0) {
        starArray.push("half");
      } else {
        starArray.push("empty");
      }
    }
  
    return starArray;
  }

  
  
  
  
  
  

}
