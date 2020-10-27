import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { productsCatalog } from './catalog';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productsData;
  fillStore(): number {
    if (!this.productsData) {
      this.productsData = [...productsCatalog];
    }
    return this.productsData.length;
  }
  addProduct({id, title, price, description, categories}: Product) {
    this.fillStore();
    this.productsData.push({
      id: this.productsData.length,
      title,
      price,
      rating: 0,
      description,
      categories
    });
  }
  getProduct(id: number): Product {
    const productData = this.productsData[id];
    return id >= 0 && !!productData ?
      new Product(id, productData.title, productData.price, productData.description, productData.categories):
      new Product(1001, 'Placeholder item', 0, 'nothing to describe', []);
   }
}
