import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-item',
  template: `
    <img src="https://unsplash.it/350/150?image={{pid}}">
    <div class="caption">
      <h4 class="float-right">{{product.price | currency:'EUR'}}</h4>
      <h4><a [routerLink]="['/product/' + pid]">{{product.title}}</a></h4>
      <p>{{product.description}}</p>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  @HostBinding('class') cssClass = 'thumbnail';
  @Input() public pid: number;
  public product: Product;

  constructor(
    private prodServ: ProductService
  ) {
  }

  ngOnInit(): void {
    // should not be done in constructor, since pid will be undefined
    this.product = this.prodServ.getProduct(this.pid);
  }

}
