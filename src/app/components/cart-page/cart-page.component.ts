import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { cart, priceSummary } from '../../shared/common-data/data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{

  cartData:cart[] | undefined
  priceSummary:priceSummary = {
    price: 0,
    discount : 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private product:ProductService, private router:Router){ }
  ngOnInit(): void {
    this.loadDetails()
  }
  loadDetails(){
    this.product.currentCart().subscribe((res)=>{
      this.cartData=res
      console.warn(this.cartData)
      let price = 0
      res.forEach((item)=>{
        if(item.quantity){
          price = price + (+item.pPrice* + item.quantity)
        }
      })

      this.priceSummary.price=price
      this.priceSummary.discount=price/10
      this.priceSummary.tax=price/30
      this.priceSummary.delivery=100
      this.priceSummary.total=price+(price/10)+100-(price/30)
      if(!this.cartData.length){
        this.router.navigate(['/'])
      }
      
    })
  }


  removeToCart(cartId: number | undefined){
    cartId && this.product.removeToCart(cartId)
      .subscribe((res)=>{
       this.loadDetails()
      })
  }
}
