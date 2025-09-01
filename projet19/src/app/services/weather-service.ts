import { Injectable } from '@angular/core';
import { Weather } from '../models/weather';
import { Forecast } from '../models/forecast';
import { City } from '../models/city';
import { Observable, of } from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private favoriteCities: City[] = [
    {name: 'Tunis', country: 'Tunisia', lat: 36.8, lon: 10.2},
    {name: 'Paris', country: 'France', lat: 48.8, lon: 2.3},
    {name: 'New York', country: 'USA', lat: 40.7, lon: -74.0},
    {name: 'Tokyo', country: 'Japan', lat: 35.7, lon: 139.7},
    {name: 'Sydney', country: 'Australia', lat: -33.9, lon: 151.2},
    {name: 'London', country: 'UK', lat: 51.5, lon: -0.1},
    {name: 'Cairo', country: 'Egypt', lat: 30.1, lon: 31.2},
    {name: 'Beijing', country: 'China', lat: 39.9, lon: 116.4},
    {name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9, lon: -43.2},
    {name: 'Mumbai', country: 'India', lat: 19.0, lon: 72.8}
  ];

  constructor(){}

  getCurrentWeather(city: string): Observable<Weather>{
    const weatherData: Weather = {
      location: city,
      country: 'FR',
      temperature: this.getRandomTemperature(),
      feelsLike: this.getRandomTemperature(),
      humidity: Math.floor(Math.random() * 100),
      pressure: 1013 + Math.floor(Math.random() * 20) - 10,
      windSpeed: Math.random() * 20,
      windDirection: Math.floor(Math.random() * 360),
      description: this.getRandomDescription(),
      icon: this.getRandomIcon(),
      sunrise: new Date(Date.now() - 4 * 3600000),
      sunset: new Date(Date.now() + 8 * 3600000),
      visibility: 10 + Math.floor(Math.random() * 20),
      uvIndex: Math.floor(Math.random() * 11)
    }  
    return of(weatherData).pipe(delay(500));
  }

  getForecast(city: string): Observable<Forecast[]>{
    const forecast: Forecast[] = [];

    for(let i = 1; i <= 5; i++){
      const date = new Date(Date.now() + i * 24 * 3600000);
      forecast.push({
        date,
        temperature: this.getRandomTemperature(),
        minTemperature: this.getRandomTemperature() - 5,
        maxTemperature: this.getRandomTemperature() + 5,
        description: this.getRandomDescription(),
        icon: this.getRandomIcon(),
        precipitation: Math.floor(Math.random() * 1000),
        humidity: 40 + Math.floor(Math.random() * 60)
      })
    }
    return of(forecast).pipe(delay(800));
  }

  searchCities(query: string): Observable<City[]>{
    const filtered = this.favoriteCities.filter(city => 
      city.name.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }

  private getRandomTemperature(): number{
    return Math.floor(Math.random() * 35) -5;
  }

  private getRandomDescription(): string{
    const descriptions = [
      'Ensoleillé', 'Partiellement ensoleillé', 'Nuageux', 'Couvert', 'Brouillard', 'Neige', 'Pluie', 'Orage', 'Partiellement nuageux'
    ]
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  private getRandomIcon(): string{
    const icons = [
      '01d', '02d', '03d', '04d', '09d', '10d', '11d', '13d', '50d'
    ]
    return icons[Math.floor(Math.random() * icons.length)];
  }
  
}
