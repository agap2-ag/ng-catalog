import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  template: `
      <img class="img-thumbnail" src="https://unsplash.it/1200/200?image={{pid}}">
      <div class="jumbotron jumbotron-fluid px-5">
        <h3 class="display-4 mb-2 float-right">{{ product.price | currency:'EUR' }}</h3>
        <h2 class="display-5">{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <ul class="list-group list-group-horizontal">
          <li class="list-group-item" *ngFor="let cat of product.categories">{{cat}}</li>
        </ul>
      </div>
  `,
})
export class ProductDetailComponent implements OnInit {
  public pid: number;
  product: Product;
  constructor(
    private route:ActivatedRoute,
    private prodServ: ProductService
  ) {
    this.pid = Number(route.snapshot.paramMap.get('id'));
    this.product = prodServ.getProduct(this.pid);
  }

  ngOnInit(): void {
  }

}
