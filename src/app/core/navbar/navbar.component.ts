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
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];

  activeItem!: MenuItem;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: 'feed'
      },
      { label: 'Search', icon: 'pi pi-search', routerLink: 'new-review-bis' },
      {
        label: 'Add', icon: 'pi pi-plus', routerLink: 'new-review'
        // items: [
        //   {
        //     label: 'Livre',
        //     icon: 'pi pi-fw pi-plus',
        //     routerLink: 'new-'
        //   },
        //   {
        //     label: 'Film',
        //     icon: 'pi pi-fw pi-trash'
        //   }
        // ]
      },
      { label: 'Notifications', icon: 'pi pi-bell', routerLink: 'notifications' },
      { label: 'Account', icon: 'pi pi-user', routerLink: 'account' }
    ];

    this.activeItem = this.items[0];
  }
}
