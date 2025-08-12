import { Component, signal } from '@angular/core';
import { NotesListComponent } from './notes-list-component/notes-list-component';

@Component({
  selector: 'app-root',
  imports: [NotesListComponent],
  template: `
    <app-notes-list-component></app-notes-list-component>
  `,
  styles: ``,
})
export class App {
  protected readonly title = signal('projet2');
}
