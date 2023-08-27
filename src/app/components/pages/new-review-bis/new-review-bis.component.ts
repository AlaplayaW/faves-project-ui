import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/item.model';
import { ImageModule } from 'primeng/image';
import { SliderModule } from 'primeng/slider';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ItemCardComponent } from 'src/app/shared/components/item-card/item-card.component';
import { ItemTypeEnum } from 'src/app/shared/enum/item-type-enum';
import { Router } from '@angular/router';
import { NewItemComponent } from '../new-item/new-item.component';
import { ReviewService } from 'src/app/services/review.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { GoogleBook } from 'src/app/shared/models/google-book.model';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-new-review-bis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, AutoCompleteModule, ImageModule, ItemCardComponent, NewItemComponent, SliderModule, AutoCompleteModule],
  templateUrl: './new-review-bis.component.html',
  styleUrls: ['./new-review-bis.component.scss']
})
export class NewReviewBisComponent implements OnInit {

  fb = inject(FormBuilder);
  router = inject(Router);
  reviewService = inject(ReviewService);
  itemService = inject(ItemService);
  googleBooksService = inject(GoogleBooksService);
  searchTerms = new Subject<string>();
  
  /// NEW ///
  books: any[] | undefined;
  selectedItem: any;
  filteredItems: any[] | undefined;
  searchQuery$ = new Subject<string>();
  /// END NEW ///


  createReviewForm: FormGroup;

  itemType: ItemTypeEnum | undefined;
  searchForm: FormGroup | undefined;

  suggestions: any[] | undefined;
  isSelected: boolean = false;
  noResults: boolean = false;

  itemToReview: Item | undefined;

  showCreateItemForm: boolean = false;
  showCreateReviewForm: boolean = false;



  ngOnInit() {

    this.searchForm = new FormGroup({
      selectedItem: new FormControl<object | null>(null)
    });
    this.createReviewForm = this.fb.group({
      comment: ['', Validators.required],
      rating: ['', Validators.required],
      // Add other form controls for item creation (e.g., author, publisher, etc.)
    });
  }


  filterItems(event: AutoCompleteCompleteEvent) {
  const query = event.query;
  this.searchQuery$.next(query);

  this.googleBooksService.searchBooks(this.searchQuery$).subscribe(data => {
    this.filteredItems = data;
    console.log('Filtered Items:', this.filteredItems);
  });

}
  

  onItemFormSubmit() {
    this.showCreateItemForm = false;
    this.showCreateReviewForm = true;
  }

  onCreateReview() {
    this.showCreateReviewForm = true;
  }

  onSubmit(): void {
    if (this.createReviewForm.valid) {
      const newReview = this.createReviewForm.value;
      // Call the reviewService to create the new item
      this.reviewService.createReview(newReview).subscribe(
        createdReview => {
          console.log(createdReview);
          // this.selectedBook = createdBook;
          // this.isSelected = true;
        }
      );
    }
  }

  // Fonction pour récupérer la valeur de selectedItem
  getSelectedItem(): Item | any {
    return this.searchForm?.get('selectedItem')?.value;
  }

  get searchPlaceholder(): string {
    return this.itemType === 'book' ? 'Cherche un livre' : 'Cherche un film';
  }

  search(term: string) {
    this.searchTerms.next(term);
    console.log(term);
  }



  onSelectNew() {
    this.isSelected = true;
    if (this.getSelectedItem().id !== 'NotFound') {
      this.itemToReview = this.getSelectedItem();
      this.showCreateReviewForm = true;
      console.log(this.itemToReview);
    } else {
      console.log(this.itemType);
      this.itemType === ItemTypeEnum.Book ? this.router.navigate(['/new-book']) : this.router.navigate(['/new-movie'])
      // this.showCreateItemForm = true;
    }
  }

}
