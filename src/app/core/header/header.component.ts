import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { ActivatedRoute, RouterStateSnapshot, Router, TitleStrategy, DefaultTitleStrategy } from '@angular/router';
import { filter, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  providers: [DefaultTitleStrategy],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // router = inject(Router);
  route = inject(ActivatedRoute);
  titleStrategy = inject(DefaultTitleStrategy);
  title: string;
  pageTitle: string = '';



  ngOnInit(): void {
    this.route.title.subscribe((title) => console.log('=========title:' , title));
    this.title = this.titleStrategy.title.getTitle();
    console.log('===== this.title:', this.title );
  }

}
