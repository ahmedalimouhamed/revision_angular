import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAnimateValue]'
})
export class AnimateValue implements OnInit {

  @Input() appAnimateValue: number = 0;
  @Input() duration: number = 1000;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(){
    this.animateValue()
  }


  private animateValue(){
    const element = this.el.nativeElement;
    const start = 0;
    const end =this.appAnimateValue;
    const range = end - start;
    const duration = this.duration;
    const startTime = performance.now();
    const decimals = end % 1 !== 0 ? 1 : 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const value = start + (range * progress);
      this.renderer.setProperty(element, 'textContent', value.toFixed(decimals));

      if(progress < 1){
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

}
