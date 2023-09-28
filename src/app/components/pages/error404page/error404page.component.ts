import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error404page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error404-container">
      <h1>Page non trouvée</h1>
      <p>La page que vous recherchez est introuvable.</p>
    </div>
  `,
  styleUrls: []
})
export class Error404PageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}