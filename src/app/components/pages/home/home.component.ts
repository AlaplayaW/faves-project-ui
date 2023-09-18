import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBookComponent } from '../../book/list-book/list-book.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListBookComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // @Input() bookType: string = "";
}
