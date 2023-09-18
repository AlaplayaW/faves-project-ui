import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemTypeEnum } from 'src/app/shared/enum/item-type-enum';
import { ItemService } from 'src/app/services/item.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Media } from 'src/app/shared/models/media.model';
import { Book } from 'src/app/shared/models/book.model';
import { Movie } from 'src/app/shared/models/movie.model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { UserService } from 'src/app/services/user.service';
import { CreateItemDto } from 'src/app/shared/models/createItemDto.model';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule, CalendarModule, FileUploadModule],
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {

  mediaType: ItemTypeEnum;

  pageTitle: string = '';
  titlePlaceholder: string = '';

  createItemForm: FormGroup;

  fb = inject(FormBuilder);
  messageService = inject(MessageService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  itemService = inject(ItemService);

  currentUserId: string = "1";
  file: File | null = null;
  uploadedFiles: any[] = [];
  // constructor() {
  //   this.userService.getUserById("1").subscribe((user) => this.currentUser = user);
  //   console.log('currentUser : ', this.currentUser);
  // }
  ngOnInit(): void {
    // this.route.title.subscribe
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length > 0) {
        const segment = urlSegments[0].path;
        if (segment === 'new-book') {
          this.pageTitle = "Ajouter un livre";
          this.titlePlaceholder = "Titre du livre";
          this.mediaType = ItemTypeEnum.Book;

        } else if (segment === 'new-movie') {
          this.pageTitle = "Ajouter un film";
          this.titlePlaceholder = "Nom du film";
          this.mediaType = ItemTypeEnum.Movie;

        }
      }
    });

    this.createItemForm = this.fb.group({
      title: ['', Validators.required],
      mediaType: [ItemTypeEnum, Validators.required],
      subtitle: [''],
      description: [''],
      media: [''],
      authors: [[]],
      publishers: [[]],
      publishedDate: [''],
      pageCount: [0],
      type: [''],
      cast: [[]],
      directors: [[]],
      year: [''],
      runtime: [0],
    });
  }

  onFileUpload(event: any) {
    // Assuming the uploaded file is an object with relevant information
    const uploadedFile = event.files[0];
    console.log('uploadedFile : ----- ', uploadedFile);
    this.createItemForm.patchValue({
      media: uploadedFile.url // Assuming the URL of the uploaded file
    });
  }

  onSubmit(): void {
    if (this.createItemForm.valid) {

      const newMedia: Media = {
        imageUrl: this.createItemForm.value.mediaUrl,
      };

      const newBook: Book = {
        authors: this.createItemForm.value.authors,
        publishers: this.createItemForm.value.publishers,
        publishedDate: this.createItemForm.value.publishedDate,
        pageCount: this.createItemForm.value.pageCount,
      };

      const newMovie: Movie = {
        cast: this.createItemForm.value.cast,
        directors: this.createItemForm.value.directors,
        year: this.createItemForm.value.year,
        runtime: this.createItemForm.value.runtime,
      };

      const newItem: CreateItemDto = {
        mediaType: this.mediaType,
        title: this.createItemForm.value.title,
        subtitle: this.createItemForm.value.subtitle,
        description: this.createItemForm.value.description,
        // postedBy: '/api/users/1',
        postedBy: `/api/users/${this.currentUserId}`,
        media:  newMedia,
        // book:  `/api/items/${newBook.id}`,
        // movie:  `/api/items/${newMovie.id}`,
      };
      console.log(newItem);

      this.itemService.createItem(newItem).subscribe(
        createdItem => {
          console.log(createdItem);

          // Navigate back to new-review with created item as query parameter
          this.router.navigate(['/new-review'], {
            queryParams: { createdItemId: createdItem.id },
          });
        }
      );
    }
  }

  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    this.file = event.files[0];
    console.log('event.files[0]: ' , event.files[0]);
    console.log(event);
}

onSelect(event: UploadEvent) {
  this.file = event.files[0];
  console.log('event.files[0]: ' , event.files[0]);
  console.log(event);
}

  // get formTitle(): string {
  //   return this.mediaType === 'book' ? 'Ajouter un livre' : 'Ajouter un film';
  // }




}
