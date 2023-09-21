import { Component, OnInit, Provider, forwardRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControlDirective, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BackButtonDirective } from 'src/app/shared/directives/back-button.directive';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    FileUploadModule,
    ToastModule,
    BackButtonDirective,
  ],
  templateUrl: './signup.component.html',
  styleUrls: [],
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  fb = inject(FormBuilder);
  messageService = inject(MessageService);
  router = inject(Router);
  authService = inject(AuthService);

  file: File | null = null;
  uploadedFiles: any[] = [];
  // checked: boolean = false;

  ngOnInit() {
    this.signupForm = this.fb.group({
      pseudo: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          this.passwordValidator, // Utilisation du validateur personnalisé
        ]),
      ],
      rgpd: ['', Validators.required],
    });
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset();
        this.router.navigate(['log-in']);
      }
    });
  }

  onFileUpload(event: any) {
    // Assuming the uploaded file is an object with relevant information
    const uploadedFile = event.files[0];
    console.log('uploadedFile : ----- ', uploadedFile);
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    this.signupForm.patchValue({
      media: uploadedFile.name // Assuming the URL of the uploaded file
    });
  }

  onSelect(event: UploadEvent) {
    this.file = event.files[0];
    console.log('event.files[0]: ', event.files[0]);
    console.log(event);
  }

  // Fonction de validation personnalisée pour le mot de passe
  private passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;

    // Définissez votre expression régulière pour la validation du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$*&])[A-Za-z0-9!@#$*&]{8,}$/;

    if (!passwordRegex.test(password)) {
      // La validation a échoué, retournez une erreur personnalisée
      return { invalidPassword: true };
    }

    // La validation a réussi, retournez null
    return null;
  }

}
