import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book.service';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/models/book.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-book',
  standalone: true,
  imports: [CommonModule, CardModule, AvatarModule, ImageModule],
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBookComponent {

  bookService = inject(BookService);
  router = inject(Router);

  books$!: Observable<Book[]>;

  // ngOnInit(): void {
  //   this.loadBooks();
  // }

  // private loadBooks(page?: number) {
  //   this.books$ = this.bookService.getBooks();
  // }

  // getNetwork(bookId: number, page: number, isGroupsActive: boolean, isFriendsActive: boolean): Observable<any> {
  //   const params = {
  //     page: page.toString(),
  //     isGroupsActive: isGroupsActive.toString(),
  //     isFriendsActive: isFriendsActive.toString()
  //   };
  //   const url = `${this.baseUrl}books/${bookId}/network`;
  //   return this.http.get(url, { params }).pipe(
  //     tap((response) => this.log(response)),
  //     catchError((error) => this.handleError(error, []))
  //   );
  // }

  // getBookList(page: number): void {
  //   const params = {
  //     page: "1"
  //   };
  //   this.loaded = false;
  //   this.booksService.getBookList('http://127.0.0.1:8000/api/books')
  //     .subscribe(
  //       bookList => {
  //         this.bookList = bookList;
  //         console.log("this.booklist ----", this.bookList);
  //         this.loaded = true;
  //       });
  // }
}
