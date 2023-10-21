import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './connexion.component.html',
  styleUrls: [],
})
export class ConnexionComponent {}
