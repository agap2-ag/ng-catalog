import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { NotFoundComponent } from './components/not-found.component';
import { ProductDetailComponent } from './components/product-detail.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'products', component: HomeComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path:'**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
