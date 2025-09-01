import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';
import { ProductItem } from '../product-item/product-item';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.categories = this.productService.getCategories();
    this.filterProducts();
  }

  filterProducts(){
    if(this.selectedCategory){
      this.products = this.productService.getProductsByCategory(this.selectedCategory);
    }else{
      this.products = this.productService.getProducts();
    }
  }

  onCategoryChange(category: string){
    this.selectedCategory = category;
    this.filterProducts();
  }

  onRateProduct(event: {productId: number, rating: number}){
    this.productService.updateProductRating(event.productId, event.rating);
    this.filterProducts();
  }
}
