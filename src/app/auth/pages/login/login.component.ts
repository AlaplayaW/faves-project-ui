import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PanelModule } from 'primeng/panel';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PanelModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
    
  submitted = false;
  
  ngOnInit() {
      this.loginForm = new FormGroup({
          'login': new FormControl('', Validators.required),
          'password': new FormControl('', Validators.required)
      });
  }
  
  onSubmit() { 
      this.submitted = true;
      alert(JSON.stringify(this.loginForm.value));
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
