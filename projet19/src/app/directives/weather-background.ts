import { Directive, ElementRef, Input, Output, Renderer2 } from '@angular/core';
import { OnInit } from '@angular/core';

@Directive({
  selector: '[appWeatherBackground]'
})
export class WeatherBackground implements OnInit {

  @Input() appWeatherBackground: string = '';
  @Input() temperature: number = 20;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(){
    this.setBackground();
  }

  private setBackground(){
    let background = '';
    if(this.appWeatherBackground.toLowerCase().includes('soleil') || this.appWeatherBackground.toLowerCase().includes('ensoleillé')){
      background = this.getSunnyGradient();
    }else if(this.appWeatherBackground.toLowerCase().includes('nuage') || this.appWeatherBackground.toLowerCase().includes('nuageux')){
      background = this.getCloudyGradient();
    }else if(this.appWeatherBackground.toLowerCase().includes('pluie') || this.appWeatherBackground.toLowerCase().includes('pluvieux')){
      background = this.getRainyGradient();
    }else if(this.appWeatherBackground.toLowerCase().includes('neige') || this.appWeatherBackground.toLowerCase().includes('neigeux')){
      background = this.getSnowyGradient();
    }else{
      background = this.getTemperatureGradient();
    }

    this.renderer.setStyle(this.elementRef.nativeElement, 'background', background);
    this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'background 1s ease');
  }

  private getTemperatureGradient(): string{
    if(this.temperature < 0){
      return 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)';
    }else if(this.temperature < 10){
      return 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)';
    }else if(this.temperature < 20){
      return 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)';
    }else{
      return 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)';
    }
  }

  private getSunnyGradient(): string{
    return 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)';
  }

  private getCloudyGradient(): string{
    return 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)';
  }

  private getRainyGradient(): string{
    return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
  }

  private getSnowyGradient(): string{
    return 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)';
  }

}
