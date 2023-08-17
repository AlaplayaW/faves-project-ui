import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from '../../item/list-item/list-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // @Input() itemType: string = "";
}
