import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/shared/models/book.model';
import { ImageModule } from 'primeng/image';
import { SliderModule } from 'primeng/slider';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BookCardComponent } from 'src/app/shared/components/book-card/book-card.component';
import { Router } from '@angular/router';
import { NewBookComponent } from '../new-book/new-book.component';
import { ReviewService } from 'src/app/services/review.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-new-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, AutoCompleteModule, ImageModule, BookCardComponent, NewBookComponent, SliderModule, AutoCompleteModule],
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss']
})
export class NewReviewComponent implements OnInit {

  fb = inject(FormBuilder);
  router = inject(Router);
  reviewService = inject(ReviewService);
  bookService = inject(BookService);
  googleBooksService = inject(GoogleBooksService);

  createReviewForm: FormGroup;

  searchForm: FormGroup | undefined;

  suggestions: any[] | undefined;
  isSelected: boolean = false;
  noResults: boolean = false;

  bookToReview: Book | undefined;

  showCreateBookForm: boolean = false;
  showCreateReviewForm: boolean = false;

  ngOnInit() {
    this.searchForm = new FormGroup({
      selectedBook: new FormControl<object | null>(null)
    });
    this.createReviewForm = this.fb.group({
      comment: ['', Validators.required],
      rating: ['', Validators.required],
      // Add other form controls for book creation (e.g., author, publisher, etc.)
    });
  }

  onSelect() {
    this.isSelected = true;
    if (this.getSelectedBook().id !== 'NotFound') {
      this.bookToReview = this.getSelectedBook();
      this.showCreateReviewForm = true;
      console.log(this.bookToReview);
    } else {
      this.router.navigate(['/new-book']);
      // this.showCreateBookForm = true;
    }
  }

  onBookFormSubmit() {
    this.showCreateBookForm = false;
    this.showCreateReviewForm = true;
  }

  onCreateReview() {
    this.showCreateReviewForm = true;
  }

  onSubmit(): void {
    if (this.createReviewForm.valid) {
      const newReview = this.createReviewForm.value;
      // Call the reviewService to create the new book
      this.reviewService.createReview(newReview).subscribe(
        createdReview => {
          console.log(createdReview);
          // this.selectedBook = createdBook;
          // this.isSelected = true;
        }
      );
    }
  }

  // Fonction pour récupérer la valeur de selectedBook
  getSelectedBook(): Book | any {
    return this.searchForm?.get('selectedBook')?.value;
  }

  get searchPlaceholder(): string {
    return 'Cherche un livre';
  }

  filterBook(event: AutoCompleteCompleteEvent) {

    let query = event.query;
    console.log('Autocomplete value:', event.query);

    // this.bookService.getFilteredBooks(bookType, query).subscribe((books) => {
    //   this.suggestions = books;
    //   this.suggestions.push({ id: 'NotFound', title: 'Pas trouvé' });
    //   this.noResults = this.suggestions.length === 0 ? true : false;
    //   console.log('noResults :', this.noResults);
    //   console.log('suggestions :', this.suggestions);
    // });;
  }


}
