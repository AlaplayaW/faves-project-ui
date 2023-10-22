import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
} from 'rxjs';
import { User } from 'src/app/models/user.model';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from 'src/app/services/user.service';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'app-search-friends',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    AvatarModule,
  ],
  templateUrl: './search-friends.component.html',
  styleUrls: [],
})
export class SearchFriendsComponent implements OnInit {
  userService = inject(UserService);

  users$: Observable<User[]>;
  searchTerms = new Subject<string>();
  searchQuery: string;

  ngOnInit() {
    this.loadUsers();

    this.searchTerms
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.searchQuery = term;
        this.updateFilteredUsers();
      });
  }

  private updateFilteredUsers(): void {
    const searchQueryLower =
      this.removeAccents(this.searchQuery?.toLowerCase()) || '';
    this.users$ = this.users$.pipe(
      map((users) =>
        searchQueryLower
          ? users.filter((user) => {
              const userPseudo =
                this.removeAccents(user?.pseudo?.toLowerCase()) || '';
              return userPseudo.includes(searchQueryLower);
            })
          : users
      )
    );
  }

  private loadUsers(page?: number): void {
    this.userService.getUsers().subscribe((users) => {
      this.users$ = of(users);
    });
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  removeAccents(str: string | undefined): string {
    if (str === undefined) {
      return '';
    }
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
