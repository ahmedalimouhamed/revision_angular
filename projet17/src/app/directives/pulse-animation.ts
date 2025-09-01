import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPulseAnimation]'
})
export class PulseAnimation {

  @Input() appPulseAnimation: string = 'pulse';
  @Input() duration: number = 500;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onClick(){
    this.renderer.addClass(this.el.nativeElement, 'animated');
    this.renderer.addClass(this.el.nativeElement, this.appPulseAnimation);

    setTimeout(() => {
      this.renderer.removeClass(this.el.nativeElement, 'animated');
      this.renderer.removeClass(this.el.nativeElement, this.appPulseAnimation);
    }, this.duration);
  }

}
