import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-result',
  imports: [CommonModule, RouterLink],
  templateUrl: './result.html',
  styleUrl: './result.scss'
})
export class ResultComponent {

  @Input() score!: number;
  @Input() totalQuestions!: number;

  getPercentage(): number{
    return Math.round((this.score / this.totalQuestions) * 100);
  }

}
