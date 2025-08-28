import { Directive, EventEmitter, Input, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appConfirmDelete]'
})
export class ConfirmDelete {

  @Output() confirm = new EventEmitter<void>();
  @Input() message = 'Are you sure you want to delete this item?';

  @HostListener('click', ['$event'])
  onClick(event: Event): void{
    event.preventDefault();
    event.stopPropagation();

    if(confirm(this.message)){
      this.confirm.emit();
    }
  }
}
