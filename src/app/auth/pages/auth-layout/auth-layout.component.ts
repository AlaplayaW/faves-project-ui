import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultTitleStrategy, RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/core/header/header.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './auth-layout.component.html',
  styleUrls: []
})
export class AuthLayoutComponent {

  titleStrategy = inject(DefaultTitleStrategy);
  title: string;

  ngOnInit(): void {
    this.title = this.titleStrategy.title.getTitle();
  }

}
