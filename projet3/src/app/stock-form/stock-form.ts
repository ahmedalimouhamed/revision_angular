import { Component, EventEmitter, Output } from '@angular/core';
import {FormControl, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { StockService } from '../services/stock-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './stock-form.html',
  styles: ``
})
export class StockForm {
  @Output() productAdded = new EventEmitter<void>();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
    price: new FormControl(0, Validators.min(0.01)),
    supplier: new FormControl(''),
    minStock: new FormControl(5, Validators.min(1)),
  });

  constructor(
    private stockService: StockService
  ){}

  onSubmit(){
    if(this.form.valid){
      this.stockService.addProduct(this.form.value as any);
      this.form.reset();
      this.productAdded.emit();
    }
  }
}
