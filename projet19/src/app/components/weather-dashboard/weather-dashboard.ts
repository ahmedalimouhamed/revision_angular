import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather-service';
import { Weather } from '../../models/weather';
import { Forecast } from '../../models/forecast';
import { CommonModule } from '@angular/common';
import { CitySearch } from '../city-search/city-search';
import { CurrentWeather } from '../current-weather/current-weather';
import { WeatherForecast } from '../weather-forecast/weather-forecast';
import { WeatherDetails } from '../weather-details/weather-details';

@Component({
  selector: 'app-weather-dashboard',
  imports: [
    CommonModule,
    CitySearch,
    CurrentWeather,
    WeatherForecast,
    WeatherDetails,
  ],
  templateUrl: './weather-dashboard.html',
  styleUrl: './weather-dashboard.scss'
})
export class WeatherDashboard implements OnInit{
  currentWeather: Weather | null = null;
  forecast: Forecast[] = [];
  loading: boolean = false;
  error: string = '';
  currentCity: string = 'Paris';

  constructor(private weatherService: WeatherService){}

  ngOnInit(): void {
    this.loadWeatherData(this.currentCity);
  }

  onCitySelected(city: string){
    this.currentCity = city;
    this.loadWeatherData(city);
  }

  private loadWeatherData(city: string){
    this.loading = true;
    this.error = "";

    this.weatherService.getCurrentWeather(city).subscribe({
      next: (weather: Weather) => {
        this.currentWeather = weather;
        this.loading = false;
      },
      error: (error: Error | unknown) => {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue';
        this.loading = false;
        console.error('Error loading weather : ', error);
      }
    });

    this.weatherService.getForecast(city).subscribe({
      next: (forecast: Forecast[])=>{
        this.forecast = forecast;
      },
      error: (error: Error | unknown) => {
        console.error('Error loading forecast : ', error);
      }
    })
  }

  refreshWeather(){
    this.loadWeatherData(this.currentCity);
  }
}
