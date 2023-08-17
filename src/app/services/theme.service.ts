import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public theme: BehaviorSubject<string> = new BehaviorSubject<string>("theme-soho-light");

  /**
   * 
   * @param value on selecting theme set theme variable globally
   */
  selectTheme(value: string) {
      this.theme.next(value);
  }
}
