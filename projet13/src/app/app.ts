import { Component, signal } from '@angular/core';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';

@Component({
  selector: 'app-root',
  imports: [AdminDashboard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projet13');
}
