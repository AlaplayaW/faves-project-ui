import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, CardModule, AvatarModule],
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {

  userService = inject(UserService);
  router = inject(Router);

  users$!: Observable<User[]>;


  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(page?: number) {
    this.users$ = this.userService.getUsers();
  }
  // private loadUsers(page?: number) {
  //   this.userService
  //     .getAllusers()
  //     .subscribe({
  //       next: (data) => {
  //         this.users = data;
  //         console.log('data --- :', data);
  //       },
  //       error: (error: HttpErrorResponse) => {
  //         console.log(error.message)
  //       }
  //     });
  // }



}
