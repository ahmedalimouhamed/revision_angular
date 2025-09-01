import { Directive, ElementRef, HostListener, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Directive({
  selector: '[appHover]',
  standalone: true
})
export class AppHover {
  @Input() hoverColor = '#3f51b5';
  @Input() transitionDuration = '0.3s';

  @Output() hoverStart = new EventEmitter<void>();
  @Output() hoverEnd = new EventEmitter<void>();

  private originalBackground: string = '';

  constructor(private el: ElementRef) {
    this.originalBackground = this.el.nativeElement.style.backgroundColor || '';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.transition = `background-color ${this.transitionDuration}`;
    this.el.nativeElement.style.backgroundColor = this.hoverColor;
    this.hoverStart.emit();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = this.originalBackground;
    this.hoverEnd.emit();
  }
}
