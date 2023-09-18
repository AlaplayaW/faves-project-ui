import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from 'src/app/shared/models/book.model';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { StarRatingComponent } from 'src/app/shared/components/star-rating/star-rating.component';
import { TrimTextDirective } from 'src/app/shared/directives/trim-text.directive';

@Component({
  selector: 'app-feed-card2',
  standalone: true,
  imports: [CommonModule, ImageModule, CardModule, RatingModule, StarRatingComponent, TrimTextDirective],
  templateUrl: './feed-card2.component.html',
  styleUrls: ['./feed-card2.component.scss']
})
export class FeedCard2Component {
  @Input() book: Book | undefined = undefined;

}
