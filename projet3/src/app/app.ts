import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockList } from './stock-list/stock-list';

@Component({
  selector: 'app-root',
  imports: [StockList],
  template: `
    <app-stock-list></app-stock-list>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('projet3');
}
