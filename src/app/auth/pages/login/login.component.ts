import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BackButtonDirective } from 'src/app/directives/back-button.directive';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    BackButtonDirective,
  ],
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  messageService = inject(MessageService);
  errorService = inject(ErrorService);

  loginForm: FormGroup | any;

  submitted = false;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      favsemail: new FormControl(''), // Champ honeypot
    });

    this.errorService
      .getErrorSubject()
      .subscribe((error: HttpErrorResponse) => {
        if (error.error.detail) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: error.error.detail,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: "Une erreur s'est produite lors de la requête.",
          });
        }
      });
  }

  loginUser() {
    // Vérification du champ honeypot
    if (this.loginForm.value.favsemail) {
      console.log('Tentative de soumission de robot détectée.');
      return;
    }
    this.submitted = true;
    this.authService.signIn(this.loginForm.value);
  }
}
