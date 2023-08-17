import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from 'src/app/services/item.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/models/item.model';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule, CardModule, ImageModule ],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  itemService = inject(ItemService);
  router = inject(Router);

  @Input() itemType: string = "";
  items$!: Observable<Item[]>;

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems(page?: number) {
    this.items$ = this.itemService.getItems();
  }


}
