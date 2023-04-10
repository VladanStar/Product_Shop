import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { VerifyEmailComponent } from './login/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';

const routes: Routes = [
  {path:"", redirectTo:"main", pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path: 'verify-email', component : VerifyEmailComponent},
  {path: 'forgot-password', component : ForgotPasswordComponent},
  { path: 'main', component: ProductListComponent },
  { path: 'checkout', component: CartComponent },
  { path: 'product/add', component: AddProductComponent },
  { path: 'main/product/:id', component: ProductInfoComponent },
  { path: 'product/edit/:id', component: EditProductComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
