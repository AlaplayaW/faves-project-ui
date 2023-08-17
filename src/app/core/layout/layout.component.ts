import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent,NavbarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: []
})
export class LayoutComponent {
  isMenuVisible: boolean = true;
  // @Input() isLoggedIn!: boolean;
  // constructor(private menuDataService: MenuDataService,
  //   private applicationStateService: ApplicationStateService) {
  // }

  // ngOnInit() {
  //   var that = this;
  //   this.menuDataService.toggleMenuBar.subscribe(function (data: any) {
  //     if (data && data != null) {
  //       that.isMenuVisible = !that.isMenuVisible;
  //     }
  //   });

  //   if (this.applicationStateService.getIsMobileResolution()) {
  //     this.isMenuVisible = false;
  //   } else {
  //     this.isMenuVisible = true;
  //   }
  // }

  // ngOnDestroy() {
  //   this.menuDataService.toggleMenuBar.observers.forEach(function (element) { element.complete(); });
  // }
}
