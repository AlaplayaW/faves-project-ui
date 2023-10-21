import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { UserService } from 'src/app/services/user.service';
import { Friendship } from 'src/app/models/friendship.model';
import { ButtonModule } from 'primeng/button';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-my-friends',
  standalone: true,
  imports: [CommonModule, CardModule, AvatarModule, ButtonModule],
  templateUrl: './my-friends.component.html',
  styleUrls: [],
})
export class MyFriendsComponent {
  userService = inject(UserService);
  networkService = inject(NetworkService);
  router = inject(Router);

  friendsLoading: boolean = true;
  friends$!: Observable<Friendship[]>;
  acceptedFriends: Friendship[] = [];
  pendingFriends: Friendship[] = [];

  currentUser: User;
  userJson: string | null;

  ngOnInit(): void {
    this.userJson = localStorage.getItem('user');

    if (this.userJson) {
      this.currentUser = JSON.parse(this.userJson);
    }

    this.friends$ = this.loadFriends();

    this.friends$.subscribe((friends) => {
      this.acceptedFriends = friends.filter(
        (friend) => friend.status === 'accepted'
      );
      this.pendingFriends = friends.filter(
        (friend) => friend.status === 'pending'
      );
      this.friendsLoading = false;
    });
  }

  private loadFriends(page?: number): Observable<Friendship[]> {
    return this.networkService.getAllUserFriendships().pipe(
      catchError((error) => {
        console.error('Error loading books:', error);
        return of([]);
      })
    );
  }
}
