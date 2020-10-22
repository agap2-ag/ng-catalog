import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'not-found',
  template: `
  <section class="jumbotron jumbotron-fluid">
    <h2 class="display-2 text-center">404 | No page here</h2>
  </section>
  `,
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
