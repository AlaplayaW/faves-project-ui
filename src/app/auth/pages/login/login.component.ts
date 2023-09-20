import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PanelModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  loginForm: FormGroup | any;

  submitted = false;

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  loginUser() {
    this.submitted = true;
    // this.authService.login(username, password);
    this.authService.signIn(this.loginForm.value);
  }
  // onClickLogin() {
  //   let user: User = this.userService.getUserByUserNameAndPassword(this.userName, this.password);
  //   if (user) {
  //     this.userContextService.setUser(user);
  //     this.routeStateService.add("Dashboard", '/main/dashboard', null, true);
  //     return;
  //   }
  //   this.toastService.addSingle('error', '', 'Invalid user.');
  //   return;
  // }
}
