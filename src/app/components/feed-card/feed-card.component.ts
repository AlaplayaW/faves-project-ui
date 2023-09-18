import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from 'src/app/shared/models/book.model';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { StarRatingComponent } from 'src/app/shared/components/star-rating/star-rating.component';
import { ButtonModule } from 'primeng/button';
import { Review } from 'src/app/shared/models/review.model';
import { BookService } from 'src/app/services/book.service';
import { ReviewService } from 'src/app/services/review.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup } from '@angular/forms';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-feed-card',
  standalone: true,
  imports: [CommonModule, ImageModule, CardModule, RatingModule, StarRatingComponent, ButtonModule, InputTextModule],
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss']
})
export class FeedCardComponent implements OnInit {
  @Input() book?: Book;
  bookService = inject(BookService);
  reviewService = inject(ReviewService);
  currentUserService = inject(CurrentUserService);
  formGroup: FormGroup | undefined;

  showMore = false;
  reviews: Review[] = [];


  ngOnInit() {
    
      // Utilisez le service CurrentUserService pour obtenir l'ID de l'utilisateur connecté
    // const userId = this.currentUserService.currentUser$.value?.id;
    // Assurez-vous que le livre est défini avant d'appeler la fonction
    if (this.book && this.book.id !== undefined) { // Vérifiez si book.id est défini
      this.loadReviewsForBook(this.book.id);
    }
    this.formGroup = new FormGroup({
      review: new FormControl<string | null>(null)
  });
  }



  loadReviewsForBook(bookId: number) {
    this.bookService.getReviewsByBookId(bookId).subscribe({
      next: reviews => {
        this.reviews = reviews;
      },
      error: error =>
        console.error('Erreur lors du chargement des avis du livre :', error)
    });
  }


  // submitReview() {
  //   if (this.formGroup && this.formGroup.valid) {
  //     const comment = this.formGroup.get('review')?.value;
  
  //     // Assurez-vous que le livre est défini et que le commentaire n'est pas vide
  //     if (this.book && comment) {
  //       const review: Review = {
  //         // Initialisez les propriétés de la revue ici
  //         // Par exemple, user, createdAt, updatedAt, etc.
  //         user: this.book.user,
  //         comment: comment,
  //         // Autres propriétés
  //       };
  
  //       // Appelez le service pour soumettre la revue
  //       this.reviewService.submitReview(review).subscribe({
  //         next: (newReview) => {
  //           // La revue a été soumise avec succès, vous pouvez l'ajouter à la liste des avis
  //           this.reviews.push(newReview);
  
  //           // Réinitialisez le formulaire
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
