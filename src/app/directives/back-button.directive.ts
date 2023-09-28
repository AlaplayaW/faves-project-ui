import { Directive, HostListener, inject } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Directive({
  selector: '[appBackButton]',
  standalone: true
})
export class BackButtonDirective {

  navigation = inject(NavigationService);
 
  @HostListener("click")
  onClick(): void {
    this.navigation.back();
  }

}
