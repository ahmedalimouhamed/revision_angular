import { Injectable } from '@angular/core';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private nextId = 1;

  constructor(){
    this.products = [
      {
        id: this.nextId++,
        name: 'Produit 1',
        description: 'Description du produit 1',
        price: 10,
        category: 'Catégorie 1',
        rating: 4,
        ratingCount: 10,
        imageUrl: 'https://via.placeholder.com/150'
      },
      {
        id: this.nextId++,
        name: 'Smartphone',
        description: 'Description du Smartphone',
        price: 733,
        category: 'Electronique',
        rating: 3,
        ratingCount: 5,
        imageUrl: 'https://via.placeholder.com/150'
      },
      {
        id: this.nextId++,
        name: 'Casque Audio Bluetooth',
        description: 'Description du Casque Audio Bluetooth',
        price: 300,
        category: 'Audio',
        rating: 5,
        ratingCount: 20,
        imageUrl: 'https://via.placeholder.com/150'
      },
      {
        id: this.nextId++,
        name: 'Montre connectée',
        description: 'Description du Casque Audio Bluetooth',
        price: 400,
        category: 'Electronique',
        rating: 5,
        ratingCount: 20,
        imageUrl: 'https://via.placeholder.com/150'
      },
    ]
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductsByCategory(category: string): Product[]{
    if(!category) return this.products;
    return this.products.filter(product => product.category === category);
  }

  updateProductRating(productId: number, newRating: number): void{
    const product = this.products.find(p => p.id === productId);
    if(product){
      const totalRating = product.rating * product.ratingCount;
      product.ratingCount++;
      product.rating = (totalRating + newRating) / product.ratingCount;
    }
  }

  getCategories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }
}
