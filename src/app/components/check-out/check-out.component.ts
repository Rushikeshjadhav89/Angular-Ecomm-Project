import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { regExContact, regExMail, regExName } from '../../shared/common-data/common-data';
import { cart, check, priceSummary } from '../../shared/common-data/data-type';
import { ProductService } from '../../shared/services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit{

  checkout:any
  cMail:any
  caddress:any
  cContact:any

  totalPrice: number | undefined
  cartData:cart[] | undefined

  orderMsg:string | undefined

  

  constructor(private formBuilder: FormBuilder, private product: ProductService, private router:Router){ }
  ngOnInit(): void {
    this.checkout = this.formBuilder.group(
      {
        cMail : ['',[Validators.required, Validators.pattern(regExMail)]],
        cContact : ['',[Validators.required, Validators.pattern(regExContact)]],
        caddress : ['',[Validators.required, Validators.pattern(regExName)]]
      }
    )

    this.product.currentCart().subscribe((res)=>{
      
      let price = 0
      this.cartData = res
      res.forEach((item)=>{
        if(item.quantity){
          price = price + (+item.pPrice* + item.quantity)
        }
        
      })
    
      this.totalPrice = price+(price/10)+100-(price/30)
      console.log(this.totalPrice);
      
    })
  }

  checkData(val:check){
  let user = localStorage.getItem('user')
  let userId = user && JSON.parse(user).id
  if(this.totalPrice){
    let orderData:check = {
      ...val,
     totalPrice:this.totalPrice,
     userId,
     id : undefined
     
    }

    this.cartData?.forEach((item)=>{
      setTimeout(() => {
      item.id &&  this.product.deleteCartItems(item.id)
      }, 700);
    })

    this.product.orderNow(orderData).subscribe((res)=>{
      if(res){
        alert('Order Placed')
        this.orderMsg = 'Your order has been placed'
        setTimeout(() => {
          this.router.navigate(['/my-order'])
          this.orderMsg = undefined
        }, 4000);
       
      }
    })
  }
  
  }
}
