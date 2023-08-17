import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from '../../item/list-item/list-item.component';
import { Item } from 'src/app/shared/models/item.model';
import { ListReviewComponent } from '../../review/list-review/list-review.component';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [CommonModule, ListReviewComponent],
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent {

  @Input() itemType: string = "";

}
