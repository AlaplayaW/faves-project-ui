import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonModule, TabMenuModule, MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrls: [],
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];

  activeItem!: MenuItem;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: 'feed',
      },
      { label: 'Search', icon: 'pi pi-search', routerLink: 'search-friends' },
      {
        label: 'Add',
        icon: 'pi pi-plus',
        routerLink: 'new-book',
      },
      {
        label: 'Notifications',
        icon: 'pi pi-bell',
        routerLink: 'notifications',
      },
      { label: 'Dashboard', icon: 'pi pi-user', routerLink: 'dashboard' },
    ];

    this.activeItem = this.items[0];
  }
}
