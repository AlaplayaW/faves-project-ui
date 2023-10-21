import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BookCardComponent } from 'src/app/components/book-card/book-card.component';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { Subject } from 'rxjs';
import { GoogleBook } from 'src/app/models/google-book.model';
import { environment } from 'src/environments/environment';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user.model';
import { InputNumberModule } from 'primeng/inputnumber';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-new-review',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    AutoCompleteModule,
    BookCardComponent,
    InputTextareaModule,
    InputNumberModule,
  ],
  templateUrl: './new-review.component.html',
  styleUrls: [],
})
export class NewReviewComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  reviewService = inject(ReviewService);
  bookService = inject(BookService);
  googleBooksService = inject(GoogleBooksService);

  searchTerms = new Subject<string>();

  filteredBooks: GoogleBook[] | undefined;
  searchQuery$ = new Subject<string>();

  user: User;
  userJson: string | null;

  bookData: Book;

  createReviewForm: FormGroup;

  searchForm: FormGroup | undefined;

  isSelected: boolean = false;

  showCreateBookForm: boolean = false;
  showCreateReviewForm: boolean = false;

  ngOnInit() {
    this.userJson = localStorage.getItem('user');

    if (this.userJson) {
      this.user = JSON.parse(this.userJson);
    }

    this.filteredBooks = [];

    this.searchForm = this.fb.group({
      selectedBook: [null],
    });
    this.createReviewForm = this.fb.group({
      comment: ['', Validators.required],
      rating: ['5', Validators.required],
    });
  }

  filterBooks(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.searchQuery$.next(query);

    this.googleBooksService.searchBooks(this.searchQuery$).subscribe((data) => {
      this.filteredBooks = data ? Object.values(data) : [];
      console.log('Filtered Books:', this.filteredBooks);
    });
  }

  onBookFormSubmit() {
    this.showCreateBookForm = false;
    this.showCreateReviewForm = true;
  }

  onCreateReview() {
    this.showCreateReviewForm = true;
  }

  onSubmit() {
    // 1 - Creation du livre
    this.bookService.createBook(this.bookData).subscribe((book) => {
      const newReview: Review = {
        user: `${environment.apiUrl}/users/${this.user.id}`,
        book: `${environment.apiUrl}/books/${book.id}`,
        rating: +this.createReviewForm.get('rating')?.value,
        comment: this.createReviewForm.get('comment')?.value,
      };
      // 2 - Creation de la review
      this.reviewService.createReview(newReview).subscribe((review) => {
        console.log(review);
      });
    });
  }

  getSelectedBook(): GoogleBook | any {
    return this.searchForm?.get('selectedBook')?.value;
  }

  get searchPlaceholder(): string {
    return 'Cherche un livre';
  }

  search(term: string) {
    this.searchTerms.next(term);
    console.log(term);
  }

  onSelectNew() {
    this.isSelected = true;
    if (this.getSelectedBook().id !== 'NotFound') {
      this.bookData = this.googleBooksService.convertGoogleBookToBook(
        this.getSelectedBook()
      );
      this.bookData.user = `${environment.apiUrl}/users/${this.user.id}`;
      this.showCreateReviewForm = true;
    } else {
      this.router.navigate(['/new-book']);
    }
  }
}
