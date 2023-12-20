import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { HomeComponent } from './components/home/home.component';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
const routes: Routes = [
  
  {path:'', component: HomeComponent},
  {path:'seller-auth', component:SellerAuthComponent},
  {path:'seller-home', component: SellerHomeComponent, canActivate:[AuthGuard]},
  {path:'seller-add-product', component: SellerAddProductComponent, canActivate:[AuthGuard]},
  {path:"seller-update-product", component: SellerUpdateProductComponent, canActivate:[AuthGuard]},
  {path:"seller-update-product/:id", component:SellerUpdateProductComponent},
  {path:"search/:query", component: SearchComponent},
  {path:"product-details/:productId", component: ProductDetailsComponent},
  {path:"user-auth", component: UserAuthComponent},
  {path:"cart-page", component: CartPageComponent},
  {path:"check_out", component: CheckOutComponent},
  {path:"my-order", component:MyOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
