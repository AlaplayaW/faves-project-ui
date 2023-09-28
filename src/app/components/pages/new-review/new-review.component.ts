import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';
import { ImageModule } from 'primeng/image';
import { SliderModule } from 'primeng/slider';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BookCardComponent } from 'src/app/components/book-card/book-card.component';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { Subject } from 'rxjs';
import { GoogleBook } from 'src/app/models/google-book.model';
import { Media } from 'src/app/models/media.model';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-new-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, AutoCompleteModule, ImageModule, BookCardComponent, SliderModule, AutoCompleteModule],
  templateUrl: './new-review.component.html',
  styleUrls: []
})
export class NewReviewComponent implements OnInit {

  fb = inject(FormBuilder);
  router = inject(Router);
  reviewService = inject(ReviewService);
  bookService = inject(BookService);
  googleBooksService = inject(GoogleBooksService);
  searchTerms = new Subject<string>();

  /// NEW ///
  books: any[] | undefined;
  selectedBook: GoogleBook;
  filteredBooks: GoogleBook[] | undefined;
  searchQuery$ = new Subject<string>();
  /// END NEW ///


  bookToReview: Book | undefined;

  createReviewForm: FormGroup;

  searchForm: FormGroup | undefined;

  suggestions: any[] | undefined;
  isSelected: boolean = false;
  noResults: boolean = false;


  showCreateBookForm: boolean = false;
  showCreateReviewForm: boolean = false;



  ngOnInit() {

    // Initialize this.suggestions as an empty array
    this.filteredBooks = [];

    this.searchForm = this.fb.group({
      selectedBook: [null]
    });
    this.createReviewForm = this.fb.group({
      comment: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }


  filterBooks(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.searchQuery$.next(query);

    this.googleBooksService.searchBooks(this.searchQuery$).subscribe(data => {
      this.filteredBooks = data || [];
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

  onSubmit(): void {
    if (this.createReviewForm.valid) {
      const newReview = this.createReviewForm.value;

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
      this.bookToReview = this.convertGoogleBookToBook(this.getSelectedBook());
      this.showCreateReviewForm = true;
      console.log('this.bookToReview: ', this.bookToReview);
    } else {
      this.router.navigate(['/new-book'])
      // this.showCreateBookForm = true;
    }
  }

  convertGoogleBookToBook(googleBook: GoogleBook): Book {
    const media: Media = {
      imageUrl: googleBook.volumeInfo.imageLinks?.smallThumbnail || '', 
    };
    const industryIdentifier = googleBook.volumeInfo?.industryIdentifiers?.[0];
    const isbn = industryIdentifier ? industryIdentifier.identifier : '';

    const book: Book = {
      title: googleBook.volumeInfo.title,
      subtitle: googleBook.volumeInfo.subtitle,
      authors: googleBook.volumeInfo.authors ?? [''],
      pageCount: googleBook.volumeInfo.pageCount,
      isbn: isbn,
      printType: googleBook.volumeInfo.printType,
      publishedDate: new Date(googleBook.volumeInfo.publishedDate),
      description: googleBook.volumeInfo.description,
      media: media,
    };

    return book;
  }
}
