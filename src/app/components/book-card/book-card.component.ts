import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { StarRatingComponent } from 'src/app/components/star-rating/star-rating.component';
import { TrimTextDirective } from 'src/app/directives/trim-text.directive';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    RatingModule,
    StarRatingComponent,
    TrimTextDirective,
  ],
  templateUrl: './book-card.component.html',
  styleUrls: [],
})
export class BookCardComponent {
  @Input() book: Book | undefined = undefined;
}
