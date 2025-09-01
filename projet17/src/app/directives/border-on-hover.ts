import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBorderOnHover]'
})
export class BorderOnHover {

  @Input() appBorderOnHover: string = '2px solid #3f51b5';
  @Input() borderRadius: string = '8px';

  private originalBorder: string='';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.originalBorder = this.el.nativeElement.style.border;
    this.renderer.setStyle(this.el.nativeElement, 'border', this.appBorderOnHover);
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', this.borderRadius);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'border 0.3s ease');
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.renderer.setStyle(this.el.nativeElement, 'border', this.originalBorder);
  }

}
