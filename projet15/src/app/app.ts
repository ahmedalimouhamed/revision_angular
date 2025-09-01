import { Component } from '@angular/core';
import { Highlight } from './directives/highlight';
import { Tooltip } from './directives/tooltip';
import { UserList } from './components/user-list/user-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Highlight, Tooltip, UserList],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'projet15';
}
