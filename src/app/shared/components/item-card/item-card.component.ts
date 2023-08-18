import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { Review } from '../../models/review.model';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { StarRatingComponent } from 'src/app/shared/components/star-rating/star-rating.component';
import { TrimTextDirective } from 'src/app/shared/directives/trim-text.directive';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, ImageModule, CardModule, RatingModule, StarRatingComponent, TrimTextDirective],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  @Input() review: Review | undefined = undefined;

}
