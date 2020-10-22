import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { productsCatalog } from './catalog';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProduct(id: number): Product {
    const productData = productsCatalog[id];
    return !!productData ?
      new Product(id, productData.title, productData.price, productData.description, productData.categories):
      new Product(1001, 'Placeholder item', 0, 'nothing to describe', []);
   }
}
