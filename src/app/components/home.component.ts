import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="row" *ngFor="let rowIndexes of rows">
      <div class="col-4" *ngFor="let id of rowIndexes">
        <app-product-item [pid]=id></app-product-item>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  public idsToShow: number[];
  public rows: number[][];
  public limitPerRow: number;

  constructor(
    private prodServ: ProductService
  ) {
    const listSize: number = this.prodServ.fillStore();
    this.limitPerRow = 3;
    this.idsToShow = [...Array(listSize).keys()];
    this.rows = [];
  }

  ngOnInit(): void {
    this.generateRows();
  }

  generateRows() {
    this.idsToShow.forEach((v, i) => {
      if (i === 0 || i%this.limitPerRow === 0) {
        this.rows.push([v]);
      } else {
        this.rows[this.rows.length - 1].push(v);
      }
    });
  }
}
