import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SellerAuthComponent } from './components/seller-auth/seller-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './components/seller-home/seller-home.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerProductListComponent } from './components/seller-product-list/seller-product-list.component';
import { SellerUpdateProductComponent } from './components/seller-update-product/seller-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrderComponent } from './components/my-order/my-order.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerProductListComponent,
    SellerUpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    FooterComponent,
    CartPageComponent,
    CheckOutComponent,
    MyOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
