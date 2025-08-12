import { Component } from '@angular/core';
import { EmployeeList } from './employee-list/employee-list';

@Component({
  selector: 'app-root',
  imports: [EmployeeList],
  template: `
    <app-employee-list></app-employee-list>
  `,
  styles: [],
})
export class App {
}
