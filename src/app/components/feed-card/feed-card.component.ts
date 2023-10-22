import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from 'src/app/models/book.model';
import { CardModule } from 'primeng/card';
import { StarRatingComponent } from 'src/app/components/star-rating/star-rating.component';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-feed-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    StarRatingComponent,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './feed-card.component.html',
  styleUrls: [],
})
export class FeedCardComponent implements OnInit {
  @Input() book: Book;

  reviewService = inject(ReviewService);
  userService = inject(UserService);

  reviewForm: FormGroup;
  reviews: Review[] | undefined = [];
  user: User | null;

  public showAllComments = false;
  public showMore = false;

  ngOnInit() {
    this.user = this.userService.getCurrentUser();

    this.reviewForm = new FormGroup({
      reviewText: new FormControl('', Validators.required),
    });
  }

  postComment(book: Book) {
    if (this.reviewForm?.valid) {
      this.reviews = this.book.reviews;
      console.log('this.reviews, ', this.reviews);

      const newReview: Review = {
        user: `${environment.apiUrl}/users/${this.user?.id}`,
        book: `${environment.apiUrl}/books/${book.id}`,
        comment: this.reviewForm.get('reviewText')?.value,
      };

      this.reviewService.createReview(newReview).subscribe((res) => {
        if (res) {
          this.reviews?.push(res);
          this.reviewForm?.reset();
        }
      });
    }
  }
}
