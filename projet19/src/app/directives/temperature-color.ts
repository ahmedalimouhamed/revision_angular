import { Directive, ElementRef, Input, Output, Renderer2 } from '@angular/core';
import { OnInit } from '@angular/core';

@Directive({
  selector: '[appTemperatureColor]'
})
export class TemperatureColor implements OnInit {

  @Input() appTemperatureColor: number = 20;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(){
    this.setColor();
  }

  private setColor(){
    let color = '';

    if(this.appTemperatureColor < -10){
      color = '#00b4ff';
    }else if(this.appTemperatureColor < 0){
      color = '#2196f3';
    }else if(this.appTemperatureColor < 10){
      color = '#4caf50';
    }else if(this.appTemperatureColor < 20){
      color = '#ff9800';
    }else if(this.appTemperatureColor < 30){
      color = '#ff5722';
    }else {
      color = 'f44336';
    }

    this.renderer.setStyle(this.el.nativeElement, 'color', color);
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
  }

}
