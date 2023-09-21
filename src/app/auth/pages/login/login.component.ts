import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BackButtonDirective } from 'src/app/shared/directives/back-button.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, BackButtonDirective],
  templateUrl: './login.component.html',
  styleUrls: []
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
    this.authService.signIn(this.loginForm.value);
  }
}
