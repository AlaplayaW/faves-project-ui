import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appTrimText]',
  standalone: true,
})
export class TrimTextDirective implements OnInit {
  @Input() maxLength: number = 30;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const text = this.el.nativeElement.textContent.trim();

    if (text.length > this.maxLength) {
      const trimmedText = text.substring(0, this.maxLength) + '...';
      this.renderer.setProperty(
        this.el.nativeElement,
        'textContent',
        trimmedText
      );
    }
  }
}
