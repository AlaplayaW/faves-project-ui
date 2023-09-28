import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { DefaultTitleStrategy } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  providers: [DefaultTitleStrategy],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  titleStrategy = inject(DefaultTitleStrategy);
  title: string;

  ngOnInit(): void {
    this.title = this.titleStrategy.title.getTitle();
  }

}
