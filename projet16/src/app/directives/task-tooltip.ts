import { Directive, ElementRef, Input, Output, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTaskTooltip]'
})
export class TaskTooltip {

  @Input() appTaskTooltip: string = '';
  private tooltipElement : HTMLElement | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('mouseenter') onMouseEnter(){
    if(this.appTaskTooltip){
      this.showTooltip();
    }
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.hideTooltip();
  }

  private showTooltip(){
    this.tooltipElement = this.renderer.createElement('div');
    const text = this.renderer.createText(this.appTaskTooltip);
    this.renderer.appendChild(this.tooltipElement, text);
    this.renderer.addClass(this.tooltipElement, 'task-tooltip');

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(this.tooltipElement, 'top', `${hostPos.bottom + 5}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${hostPos.left}px`);
    this.renderer.appendChild(document.body, this.tooltipElement);
  }

  private hideTooltip(){
    if(this.tooltipElement){
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

}
