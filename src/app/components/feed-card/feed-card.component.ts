import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from 'src/app/models/book.model';
import { CardModule } from 'primeng/card';
import { StarRatingComponent } from 'src/app/components/star-rating/star-rating.component';
import { Review } from 'src/app/models/review.model';
import { BookService } from 'src/app/services/book.service';
import { ReviewService } from 'src/app/services/review.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feed-card',
  standalone: true,
  imports: [CommonModule, CardModule, StarRatingComponent, InputTextModule],
  templateUrl: './feed-card.component.html',
  styleUrls: []
})
export class FeedCardComponent implements OnInit {
  @Input() book?: Book;

  bookService = inject(BookService);
  reviewService = inject(ReviewService);
  formGroup: FormGroup | undefined;

  showMore = false;
  reviews: Review[] = [];


  ngOnInit() {
    this.formGroup = new FormGroup({
      review: new FormControl<string | null>(null)
  });
  }

  // submitReview() {
  //   if (this.formGroup && this.formGroup.valid) {
  //     const comment = this.formGroup.get('review')?.value;
  
  //     if (this.book && comment) {
  //       const review: Review = {
  //         user: this.book.user,
  //         comment: comment,
  //       };
  
  //       this.reviewService.submitReview(review).subscribe({
  //         next: (newReview) => {
  //           // La revue a été soumise avec succès, vous pouvez l'ajouter à la liste des avis
  //           this.reviews.push(newReview);
  
  //           this.formGroup.reset();
  //         },
  //         error: (error) => {
  //           console.error('Erreur lors de la soumission de la revue :', error);
  //         },
  //       });
  //     }
  //   }
  // }
  

}
