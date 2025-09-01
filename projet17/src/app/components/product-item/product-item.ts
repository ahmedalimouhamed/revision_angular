import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { RatingStars } from '../rating-stars/rating-stars';
import { BorderOnHover } from '../../directives/border-on-hover';
import { PulseAnimation } from '../../directives/pulse-animation';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-item',
  imports: [RatingStars, BorderOnHover, CurrencyPipe],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss'
})
export class ProductItem {

  @Input() product: Product | null = null;
  @Output() rateProduct = new EventEmitter<{productId: number, rating: number}>();

  onRate(rating: number){
    if(this.product){
      this.rateProduct.emit({productId: this.product.id, rating})
    }
  }
}
