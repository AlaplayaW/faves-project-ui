import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { SessionService } from './services/session.service';
import { LayoutComponent } from './core/layout/layout.component';
import { LoaderService } from './services/loader.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { map, shareReplay } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, LayoutComponent, ProgressSpinnerModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'faves-project-ui';

  showLoader!: boolean;
  theme: string;
  // @Input() isLoggedIn: boolean = true;


  readonly isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private loaderService: LoaderService,
    private themeService: ThemeService,
    private sessionService: SessionService,
    @Inject(BreakpointObserver) private breakpointObserver: BreakpointObserver,
    // private messageService: MessageService
  ) {

    var theme = this.sessionService.getItem("selected-theme");
    if (theme != null && theme.length > 0) {
      this.theme = theme;
      this.themeService.selectTheme(theme);
    } else {
      this.theme = "theme-soho-light";
    }
  }

  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });

    this.themeService.theme.subscribe((val: string) => {
      this.theme = val;
    });
  }
  // méthode pour voir le message toast.
  //   show() {
  //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  // }
  ngOnDestroy() {
    this.themeService.theme.observers.forEach(function (element) { element.complete(); });
    this.loaderService.status.observers.forEach(function (element) { element.complete(); });
  }
}
