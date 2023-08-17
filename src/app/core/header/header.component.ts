import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items!: MenuItem[];
  ngOnInit() {
    this.items = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
        }
    ];
}
}
