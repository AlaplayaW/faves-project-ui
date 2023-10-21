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
  styles: [
    `
    .error404-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      background-color: #f2f2f2;
    }

    h1 {
      font-size: 3rem;
      color: #333;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.5rem;
      color: #666;
    }
    `
  ]
})
export class Error404PageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}