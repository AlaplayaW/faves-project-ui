import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history: string[] = [];
  router = inject(Router);
  location = inject(Location);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }
 
  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
