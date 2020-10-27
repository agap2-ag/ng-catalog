import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-create',
  template: `
    <form
      class="container mt-3"
      [formGroup]="productForm"
      (ngSubmit)="onCreate()"
    >
      <div class="row">
        <label class="form-group col-sm-12 col-md-3">
          Product Title
          <input
            class="form-control {{
              title.touched ? 'is-' + (title.valid ? '' : 'in') + 'valid' : ''
            }}"
            type="text"
            formControlName="title"
            required
          />
          <small *ngIf="!title.valid" class="invalid-feedback"
            >Require 3 to 20 characters</small
          >
        </label>
        <label class="form-group col-sm-12 col-md-2">
          Product Price
          <input
            class="form-control {{
              price.touched ? 'is-' + (price.valid ? '' : 'in') + 'valid' : ''
            }}"
            type="text"
            formControlName="price"
            required
          />
          <small *ngIf="!price.valid" class="invalid-feedback"
            >Number required (e.g. 0.1)</small
          >
        </label>
        <label class="form-group col-sm-12 col-md-7">
          Product Description
          <input
            class="form-control {{
              description.touched
                ? 'is-' + (description.valid ? '' : 'in') + 'valid'
                : ''
            }}"
            type="text"
            formControlName="description"
          />
          <small *ngIf="!description.valid" class="invalid-feedback"
            >Maximum 100 characters</small
          >
        </label>
      </div>
      <hr />
      <div class="row">
        <div class="col-10 col-lg-2">
          <p>Add categories</p>
        </div>
        <div class="col-1">
          <button
            class="btn btn-sm btn-success"
            type="button"
            title="Add a category"
            (click)="addCategory()"
          >
            +
          </button>
        </div>
      </div>
      <div class="row">
        <section
          class="form-group form-inline col-12"
          formArrayName="categories"
        >
          <div
            class="input-group mr-2 my-1"
            *ngFor="let category of categories.controls; let i = index"
          >
            <input
              class="form-control form-control-sm {{
                category.touched
                  ? 'is-' + (category.valid ? '' : 'in') + 'valid'
                  : ''
              }}"
              type="text"
              [formControlName]="i"
            />
            <div class="input-group-append">
              <button
                class="btn btn-sm btn-danger"
                title="Remove this category"
                (click)="removeCategory(i)"
              >
                -
              </button>
            </div>
            <small *ngIf="!category.valid" class="invalid-feedback"
              >Requires 2 to 20 characters</small
            >
          </div>
        </section>
      </div>
      <button
        class="btn btn-primary"
        type="submit"
        [disabled]="!productForm.valid"
      >
        Create and go to products list
      </button>
      <small
        class="form-text text-muted {{
          productForm.status ? 'in' : ''
        }}valid-feedback"
        >{{ productForm.status ? 'Inv' : 'V' }}alid form</small
      >
    </form>
  `,
})
export class ProductCreateComponent implements OnInit {
  public productForm: FormGroup;
  get title() {
    return this.productForm.get('title') as FormControl;
  }
  get price() {
    return this.productForm.get('price') as FormControl;
  }
  get description() {
    return this.productForm.get('description') as FormControl;
  }
  get categories() {
    return this.productForm.get('categories') as FormArray;
  }

  constructor(
    private formB: FormBuilder,
    private prodServ: ProductService,
    private router: Router
  ) {
    this.productForm = this.formB.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      price: ['', [Validators.required, Validators.pattern(/^\d+(?:\.\d+)?$/)]],
      description: ['', Validators.maxLength(100)],
      categories: this.formB.array([
        this.formB.control('', [
          Validators.minLength(2),
          Validators.maxLength(20),
        ]),
      ]),
    });
  }

  ngOnInit(): void {}

  onCreate() {
    const productData: Product = this.productForm.value as Product;
    if (productData) {
      this.prodServ.addProduct(productData);
    }
    this.router.navigate(['products']);
  }

  addCategory() {
    this.categories.push(
      this.formB.control('', [
        Validators.minLength(2),
        Validators.maxLength(20),
      ])
    );
  }

  removeCategory(index: number) {
    this.categories.removeAt(index);
  }
}
