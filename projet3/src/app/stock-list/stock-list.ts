import { Component, inject } from '@angular/core';
import { StockService } from '../services/stock-service';
import {CurrencyPipe, DatePipe} from '@angular/common';
import { StockForm } from '../stock-form/stock-form';
import { Product } from '../models/Product.model';


@Component({
  selector: 'app-stock-list',
  imports: [CurrencyPipe, DatePipe, StockForm],
  templateUrl: './stock-list.html',
  styles: ``
})
export class StockList {
  stockService = inject(StockService);
  editingId: string | null = null;

  updateQuantity(id: string, change: number){
    const product = this.stockService.products().find((p: Product) => p.id === id);
    if(product){
      this.stockService.updateProduct(id, {
        quantity: product.quantity + change
      });
    }
  }
}
