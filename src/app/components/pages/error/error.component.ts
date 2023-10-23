import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-container">
      <h1>Erreur</h1>
      <p>Une erreur s'est produite.</p>
    </div>
  `,
  styleUrls: [],
})
export class ErrorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
