import { Component, Input } from '@angular/core';
import { Forecast } from '../../models/forecast';
import { CommonModule } from '@angular/common';
import { WeatherIconPipe } from '../../pipes/weather-icon-pipe';
import { TemperaturePipe } from '../../pipes/temperature-pipe';
import { TemperatureColor } from '../../directives/temperature-color';

@Component({
  selector: 'app-weather-forecast',
  imports: [
    CommonModule,
    WeatherIconPipe,
    TemperaturePipe,
    TemperatureColor
  ],
  templateUrl: './weather-forecast.html',
  styleUrl: './weather-forecast.scss'
})
export class WeatherForecast {

  @Input() forecast: Forecast[] = [];
  @Input() loading: boolean = false;
  
}
