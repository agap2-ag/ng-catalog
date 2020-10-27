import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Catalog App</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="navbar-nav">
            <a class="nav-item nav-link {{ routeMatches('/') }}" [routerLink]="['/']">Home <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link {{ routeMatches('/product/new') }}" [routerLink]="['/product/new']">Create</a>
          </div>
        </nav>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `,
})
export class AppComponent {
  public title = 'ng-catalog';
  public currentUrl: string;
  constructor(
    private route: Router
  ) {

  }

  routeMatches(routeToTest: string): string {
    return this.route.url === routeToTest  ? 'active' : '';
  }
}
