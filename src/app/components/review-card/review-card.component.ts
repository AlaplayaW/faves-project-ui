import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { StarRatingComponent } from 'src/app/components/star-rating/star-rating.component';
import { TrimTextDirective } from 'src/app/directives/trim-text.directive';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule, ImageModule, CardModule, RatingModule, StarRatingComponent, TrimTextDirective],
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {

  @Input() review: Review | undefined = undefined;

}
