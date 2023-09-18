import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Media } from 'src/app/shared/models/media.model';
import { Book } from 'src/app/shared/models/book.model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { UserService } from 'src/app/services/user.service';
import { CreateBookDto } from 'src/app/shared/models/createBookDto.model';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule, CalendarModule, FileUploadModule],
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  pageTitle: string = '';
  titlePlaceholder: string = '';

  createBookForm: FormGroup;

  fb = inject(FormBuilder);
  messageService = inject(MessageService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  bookService = inject(BookService);

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
    });

    this.createBookForm = this.fb.group({
      title: ['', Validators.required],
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
    this.createBookForm.patchValue({
      media: uploadedFile.url // Assuming the URL of the uploaded file
    });
  }

  onSubmit(): void {
    if (this.createBookForm.valid) {

      const newMedia: Media = {
        imageUrl: this.createBookForm.value.mediaUrl,
      };

      // const newBook: Book = {
      //   authors: this.createBookForm.value.authors,
      //   publisher: this.createBookForm.value.publishers,
      //   publishedDate: this.createBookForm.value.publishedDate,
      //   pageCount: this.createBookForm.value.pageCount,
      // };

      const newBook: CreateBookDto = {
        title: this.createBookForm.value.title,
        subtitle: this.createBookForm.value.subtitle,
        description: this.createBookForm.value.description,
        // user: '/api/users/1',
        user: `/api/users/${this.currentUserId}`,
        media:  newMedia,
        // book:  `/api/books/${newBook.id}`,
        // movie:  `/api/books/${newMovie.id}`,
      };
      console.log(newBook);

      this.bookService.createBook(newBook).subscribe(
        createdBook => {
          console.log(createdBook);

          // Navigate back to new-review with created book as query parameter
          this.router.navigate(['/new-review'], {
            queryParams: { createdBookId: createdBook.id },
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
