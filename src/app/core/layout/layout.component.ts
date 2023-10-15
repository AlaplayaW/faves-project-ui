import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,HeaderComponent,NavbarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: []
})
export class LayoutComponent {}
