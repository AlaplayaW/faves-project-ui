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

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-new-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, AutoCompleteModule, ImageModule, ItemCardComponent, NewItemComponent, SliderModule, AutoCompleteModule],
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss']
})
export class NewReviewComponent implements OnInit {

  fb = inject(FormBuilder);
  router = inject(Router);
  reviewService = inject(ReviewService);
  itemService = inject(ItemService);
  googleBooksService = inject(GoogleBooksService);

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


  toggleEditor(type: string) {
    if (type === 'book' || type === 'movie') {
      this.itemType = type as ItemTypeEnum;
    }
  }

  onSelect() {
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

  filterItem(itemType: string, event: AutoCompleteCompleteEvent) {

    let query = event.query;
    console.log('Autocomplete value:', event.query);

    this.itemService.getFilteredItems(itemType, query).subscribe((items) => {
      this.suggestions = items;
      this.suggestions.push({ id: 'NotFound', title: 'Pas trouvé' });
      this.noResults = this.suggestions.length === 0 ? true : false;
      console.log('noResults :', this.noResults);
      console.log('suggestions :', this.suggestions);
    });;
  }


}
