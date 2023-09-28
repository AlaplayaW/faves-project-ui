import { Component, OnInit, Provider, forwardRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BackButtonDirective } from 'src/app/directives/back-button.directive';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    FileUploadModule,
    ToastModule,
    BackButtonDirective, PasswordModule, DividerModule
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

  ngOnInit() {
    this.signupForm = this.fb.group({
      pseudo: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      plainPassword: ['', Validators.required],
      roles: [['ROLE_USER']],
      rgpd: ['', Validators.required],
    });
  }

  registerUser() {
    // Créez une copie de l'objet signupForm.value sans le champ 'rgpd'
    const { rgpd, ...userWithoutRgpd } = this.signupForm.value;

    this.authService.signUp(userWithoutRgpd).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.signupForm.reset();
          this.router.navigate(['/auth/login']);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }


  onFileUpload(event: any) {
    const uploadedFile = event.files[0];
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    this.signupForm.patchValue({
      media: uploadedFile.name
    });
  }

  onSelect(event: UploadEvent) {
    this.file = event.files[0];
    console.log('event.files[0]: ', event.files[0]);
    console.log(event);
  }

}
