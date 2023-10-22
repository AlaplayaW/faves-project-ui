import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MenuModule, RouterModule, ButtonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent {

  private authservice = inject(AuthService);

  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      { label: 'Votre Profil', routerLink: 'profile' },
      { label: 'Mes amis', routerLink: 'friends' },
      { label: 'Mes publications', routerLink: 'posts' },
      { label: 'Mes notifications', routerLink: 'notifications' },
    ];
  }

  logout () {
    this.authservice.doLogout();
  }


}
