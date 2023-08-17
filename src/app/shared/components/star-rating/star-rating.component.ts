import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() rating: number | undefined = 0;
  @Input() size: number = 24;
  
  get stars(): any[] {
    const validNote = this.rating || 0;
    const maxNote = 10; // Note maximale (10)
    const numberOfStars = 5; // Nombre d'étoiles

    const normalizedNote = (validNote / maxNote) * numberOfStars;

    const starsArray: any[] = [];

    for (let i = 0; i < numberOfStars; i++) {
      if (i < normalizedNote-1) {
        starsArray.push('full-star');
      } else if (i === Math.floor(normalizedNote) && normalizedNote % 1 > 0) {
        starsArray.push('half-star');
      } else {
        starsArray.push('empty-star');
      }
    }

    return starsArray;
  }

}
