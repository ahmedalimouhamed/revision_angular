import { Component, Input } from '@angular/core';
import { Weather } from '../../models/weather';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-details',
  imports: [
    CommonModule
  ],
  templateUrl: './weather-details.html',
  styleUrl: './weather-details.scss'
})
export class WeatherDetails {

  @Input() weather: Weather | null = null;

  getWindDiretion(degrees: number){
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round((degrees / 22.5) % 16);
    return directions[index];
  }

}
