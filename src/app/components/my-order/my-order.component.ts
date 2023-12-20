import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { check } from '../../shared/common-data/data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent implements OnInit {

  orderData :check[] | undefined

  constructor(private product: ProductService){ }
  ngOnInit(): void {
    
    this.getOrderList()

   
  }
  cancelOrder(orderId:number | undefined){
      orderId && this.product.cancelOrder(orderId).subscribe((res)=>{
        this.getOrderList()
      })
  }

  getOrderList(){
    this.product.orderList().subscribe((res)=>{
      this.orderData = res})
  }
}
