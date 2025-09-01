import { Directive, ElementRef, Input, Output, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appPriorityHighlight]'
})
export class PriorityHighlight implements OnInit {

  @Input() appPriorityHighlight: 'low' | 'medium' | 'high' = 'low';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    switch(this.appPriorityHighlight){
      case 'high':
        this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #f44336');
        break;
      case 'medium':
        this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #ffeb3b');
        break;
      case 'low':
        this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #2ecc71');
        break;
    }
  }

}
