import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { AddProductComponent } from './components/add-product/add-product.component';

const routes: Routes = [
{path:"", component:ProductListComponent},
{path:'checkout', component:CartComponent},
{path:"product/add",component:AddProductComponent},
{path:"product/:id", component:ProductInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
