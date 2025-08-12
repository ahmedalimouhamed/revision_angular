import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly STORAGE_KEY = 'stock';
  products = signal<Product[]>(this.loadInitialData());

  private loadInitialData(): Product[]{
    if(typeof localStorage === 'undefined') return [];
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveData(products: Product[]): void{
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    this.products.set(products);
  }
  
  addProduct(product: Omit<Product, 'id'>): void{
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID(),
      lastUpdated: new Date()
    }
    this.saveData([...this.products(), newProduct]);
  }

  updateProduct(id: string, changes: Partial<Product>): void{
    this.saveData(
      this.products().map((p: Product) => 
        p.id === id ? {...p, ...changes, lastUpdated: new Date()} : p
      )
    );
  }

  deleteProduct(id: string): void{
    this.saveData(this.products().filter((p: Product) => p.id !== id));
  }

  getLowStock(threshold: number = 5){
    return this.products().filter((p: Product) => p.quantity <= threshold)
  }
}
