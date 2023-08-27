import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListReviewComponent } from '../../review/list-review/list-review.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { HeaderComponent } from 'src/app/core/header/header.component';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [CommonModule, ListReviewComponent, TabMenuModule, InputTextModule, HeaderComponent],
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

  currentItemType: string | undefined = 'all';
  items: MenuItem[];
  activeItem: MenuItem;
  searchQuery: string = '';
  searchTerms = new Subject<string>();

  ngOnInit(): void {
    this.items = [
      { label: 'Tous', title: 'all' },
      { label: 'Livres', title: 'book' },
      { label: 'Films', title: 'movie' }
    ];
    this.activeItem = this.items[0];
    this.currentItemType = this.activeItem.title;
    console.log("this.currentItemType: ", this.currentItemType);
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    this.currentItemType = event.title;
    console.log("this.event: ", event);
  }

  activateLast() {
    this.activeItem = (this.items as MenuItem[])[(this.items as MenuItem[]).length - 1];
  }

  search(term: string) {
    this.searchTerms.next(term);
    console.log(term);
  }
}




