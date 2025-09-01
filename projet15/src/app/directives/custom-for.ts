import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomFor]'
})
export class CustomFor {

  @Input() set appCustomForOf(collection: any[]){
    this.viewContainer.clear();
    collection.forEach((item: any, index) => {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: item,
        index
      })
    })
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

}
