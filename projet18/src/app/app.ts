import { Component, signal } from '@angular/core';
import { CommentList } from './components/comment-list/comment-list';

@Component({
  selector: 'app-root',
  imports: [CommentList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projet18');
}
