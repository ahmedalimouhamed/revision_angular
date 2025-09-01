import { Component, Input } from '@angular/core';
import { Weather } from '../../models/weather';
import { CommonModule } from '@angular/common';
import { WeatherBackground } from '../../directives/weather-background';
import { TemperatureColor } from '../../directives/temperature-color';
import { AnimateValue } from '../../directives/animate-value';
import { TemperaturePipe } from '../../pipes/temperature-pipe';
import { WeatherIconPipe } from '../../pipes/weather-icon-pipe';
import { WeatherService } from '../../services/weather-service';

@Component({
  selector: 'app-current-weather',
  imports: [
    CommonModule,
    WeatherBackground,
    TemperatureColor,
    AnimateValue,
    TemperaturePipe,
    WeatherIconPipe
  ],
  templateUrl: './current-weather.html',
  styleUrl: './current-weather.scss'
})
export class CurrentWeather {

  @Input() weather: Weather | null = null;
  @Input() loading: boolean = false;

  constructor(private weatherService: WeatherService){}

  refreshWeather(){
    this.loading = true;
    this.weatherService.getCurrentWeather(this.weather?.location || '').subscribe((weather: Weather) => {
      this.weather = weather;
      this.loading = false;
    })
  }
}
