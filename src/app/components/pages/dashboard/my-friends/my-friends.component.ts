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
import { FriendshipService } from 'src/app/services/friendship.service';

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
  friendshipService = inject(FriendshipService);
  router = inject(Router);

  friendsLoading: boolean = true;
  friends$!: Observable<Friendship[]>;
  acceptedFriends: Friendship[] = [];
  pendingFriends: Friendship[] = [];

  currentUser: User | null;

  isDeleting = false;
  isDeclining = false;

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();

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

  // deleteFriend(id: number) {
  //   this.friendshipService.deleteFriendship(id).subscribe({
  //     next: () => {
  //       this.acceptedFriends = this.acceptedFriends.filter(
  //         (friend) => friend.id !== id
  //       );
  //     },
  //     error: (error) => {
  //       console.error('Error deleting friendship:', error);
  //     },
  //   });
  // }

  deleteFriend(friend: Friendship) {
    friend.toSlide = true;

    this.friendshipService.deleteFriendship(friend.id).subscribe({
      next: () => {
        console.log('Friendship deleted successfully.');
        setTimeout(() => {
          this.acceptedFriends = this.acceptedFriends.filter(
            (f) => f.id !== friend.id
          );
          friend.toSlide = false;
        }, 500); // Ajoutez le délai en millisecondes que vous souhaitez
      },
      error: (error) => {
        console.error('Error deleting friendship:', error);
        friend.toSlide = false;
      },
    });
  }

  acceptFriend(friend: Friendship) {
    this.friendshipService.acceptFriendship(friend.id).subscribe({
      next: () => {
        const acceptedFriend = this.pendingFriends.find(
          (f) => f.id === friend.id
        );
        this.pendingFriends = this.pendingFriends.filter(
          (f) => f.id !== friend.id
        );
        if (acceptedFriend) {
          this.acceptedFriends = [...this.acceptedFriends, acceptedFriend];
        } else {
          console.error('Accepted friend not found');
        }
      },
      error: (error) => {
        console.error('Error accepting friendship:', error);
      },
    });
  }

  // rejectFriend(id: number) {
  //   this.friendshipService.rejectFriendship(id).subscribe({
  //     next: () => {
  //       this.pendingFriends = this.pendingFriends.filter(
  //         (friend) => friend.id !== id
  //       );
  //     },
  //     error: (error) => {
  //       console.error('Error declining friendship:', error);
  //     },
  //   });
  // }

  rejectFriend(friend: Friendship) {
    friend.toSlide = true;

    this.friendshipService.rejectFriendship(friend.id).subscribe({
      next: () => {
        console.log('Friendship delined successfully.');
        setTimeout(() => {
          this.pendingFriends = this.pendingFriends.filter(
            (f) => f.id !== friend.id
          );
          friend.toSlide = true;
        }, 500); // Ajoutez le délai en millisecondes que vous souhaitez
      },
      error: (error) => {
        console.error('Error deleting friendship:', error);
        friend.toSlide = true;
      },
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
