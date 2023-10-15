import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, DefaultTitleStrategy, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs';

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

  router = inject(Router);
  titleService = inject(Title);

  ngOnInit() {
    this.title = this.titleStrategy.title.getTitle();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          this.title = routeTitle;
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.titleService.setTitle(`Faves - ${title}`);
          this.title = title;
        }
      });
  }

}
