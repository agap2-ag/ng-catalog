import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { NotFoundComponent } from './components/not-found.component';
import { ProductCreateComponent } from './components/product-create.component';
import { ProductDetailComponent } from './components/product-detail.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'products', redirectTo: '', pathMatch: 'full'},
  {path:'product/new', component: ProductCreateComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path:'**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
