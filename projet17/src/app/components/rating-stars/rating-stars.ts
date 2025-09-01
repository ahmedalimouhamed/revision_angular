import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColorByRating } from '../../directives/color-by-rating';
import { PulseAnimation } from '../../directives/pulse-animation';


@Component({
  selector: 'app-rating-stars',
  imports: [ColorByRating, PulseAnimation],
  templateUrl: './rating-stars.html',
  styleUrl: './rating-stars.scss'
})
export class RatingStars {

  @Input() rating: number = 0;
  @Input() readonly: boolean = false;
  @Input() starSize: number = 24;
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [1,2,3,4,5];
  hoverRating: number = 0;

  rate(rating: number){
    if(!this.readonly){
      this.rating = rating;
      this.ratingChange.emit(rating);
    }
  }

  setHoverRating(rating: number){
    if(!this.readonly){
      this.hoverRating = rating;
    }
  }

  clearHoverRating(){
    if(!this.readonly){
      this.hoverRating = 0;
    }
  }

}
