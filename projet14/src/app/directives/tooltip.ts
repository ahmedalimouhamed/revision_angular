import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class Tooltip {

  @Input('appTooltip') tooltipText: string = '';
  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef){}

  @HostListener('mouseenter')
  onMouseEnter(): void{
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void{
    this.hideTooltip();
  }

  private showTooltip(): void{
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = 'custom-tooltip';
    this.tooltipElement.textContent = this.tooltipText;

    document.body.appendChild(this.tooltipElement);

    const rect = this.el.nativeElement.getBoundingClientRect();
    this.tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
    this.tooltipElement.style.top = `${rect.top - 30}px`;
  }

  private hideTooltip(): void{
    if(this.tooltipElement){
      document.body.removeChild(this.tooltipElement);
      this.tooltipElement = null;
    }
  }

}
