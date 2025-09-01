import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { OnInit } from '@angular/core';

@Directive({
  selector: '[appColorByRating]'
})
export class ColorByRating implements OnInit {

  @Input() appColorByRating: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.setColorByRating();
  }

  setColorByRating(){
    let color: string;

    if(this.appColorByRating >= 4.5){
      color= '#4caf50';
    }else if(this.appColorByRating >= 3.5){
      color= '#ff9800';
    }else if(this.appColorByRating >= 2.5){
      color= '#f44336';
    }else{
      color= '#9e9e9e';
    }

    this.renderer.setStyle(this.el.nativeElement, 'color', color);
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
  }

}
