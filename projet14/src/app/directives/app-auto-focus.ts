import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: 'input[appAutoFocus]',
  standalone: true
})
export class AppAutoFocus implements AfterViewInit, OnDestroy {
  @Input() delay: number = 0;
  @Input() set appAutoFocus(condition: boolean) {
    this.shouldFocus = condition !== false;
  };
  
  private shouldFocus: boolean = true;
  private timeoutId: any;

  constructor(private el: ElementRef) {
    console.log('AutoFocus Directive initialized');
  }

  ngAfterViewInit(): void {
    if (this.shouldFocus) {
      this.timeoutId = setTimeout(() => {
        this.el.nativeElement.focus();
      }, this.delay);
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
