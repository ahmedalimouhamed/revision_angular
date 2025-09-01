import { Component, signal } from '@angular/core';
import { BookingDashboard } from './components/booking-dashboard/booking-dashboard';
import { AppHover } from './directives/app-hover';
import { AppAutoFocus } from './directives/app-auto-focus';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookingDashboard, AppHover, AppAutoFocus],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('projet14');
  protected readonly isFormActive = signal(true);

  onHoverStart() {
    console.log('Hover started');
  }

  onHoverEnd() {
    console.log('Hover ended');
  } 
}
