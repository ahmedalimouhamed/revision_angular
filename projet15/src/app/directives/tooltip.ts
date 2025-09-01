import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class Tooltip {

  @Input('appTooltip') tooltipText: string = '';
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2){}

  @HostListener('mouseenter') onMouseEnter(): void{
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave(): void{
    setTimeout(() => {
      this.hideTooltip();
    }, 300);
  }

  private showTooltip(): void{
    this.tooltipElement = this.renderer.createElement('span');
    (this.tooltipElement as HTMLElement).innerText = this.tooltipText;
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
  }

  private hideTooltip(): void{
    if(this.tooltipElement){
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

}
