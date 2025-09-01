import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomIf]',
  standalone: true
})
export class CustomIf<T = any> {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set appCustomIf(condition: T | null | undefined) {
    if (condition !== null && condition !== undefined) {
      this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: condition });
    } else {
      this.viewContainer.clear();
    }
  }
}
