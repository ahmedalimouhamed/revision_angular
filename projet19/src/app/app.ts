import { Component, signal } from '@angular/core';
import { WeatherDashboard } from './components/weather-dashboard/weather-dashboard';

@Component({
  selector: 'app-root',
  imports: [WeatherDashboard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projet19');
}
