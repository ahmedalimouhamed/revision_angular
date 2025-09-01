import { Directive, HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoExpand]'
})
export class AutoExpand implements OnInit {

  @Input() maxHeight: number  = 200;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.adjustHeight();
  }

  @HostListener('input') onInput(){
    this.adjustHeight();
  }

  private adjustHeight(){
    const textarea = this.el.nativeElement;
    this.renderer.setStyle(textarea, 'height', 'auto');
    this.renderer.setStyle(textarea, 'height', Math.min(textarea.scrollHeight, this.maxHeight) + 'px');
  }
}
