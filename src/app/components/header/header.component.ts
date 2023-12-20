import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { product } from '../../shared/common-data/data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  
  menuType:string = "default"

  sellerName:string = ''
  userName:string = ''

  searchResult:undefined | product[]

   cartItems = 0
  
  constructor(private router: Router, private product: ProductService){ }
  ngOnInit(): void {
    this.router.events.subscribe((val:any)=> {
      if(val.url) {
        if(localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.log('in seller Area')
            let sellerStore = localStorage.getItem('seller')
            let sellerData = sellerStore && JSON.parse(sellerStore)[0]
            this.sellerName=sellerData.name
            this.menuType = "seller"
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          this.userName = userData.name
          this.menuType = "user"
          this.product.getCartList(userData.id)
          
        }
        else{
          // console.log('outside of seller Area')
          this.menuType = "default"
        }
      }
    });
    let cartData = localStorage.getItem('localCart') //this code make to use localstorage key to show how much cart orders is done on header we store all data in cartItems and display on html 
    if(cartData){
      this.cartItems = JSON.parse(cartData).length
    }

    this.product.cartData.subscribe((items)=>{ // this code for to make number of order item but in header it show only one order and store n
      this.cartItems = items.length
    })
  }

  SellerLogOut(){
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }
  userLogOut(){
    localStorage.removeItem('user')
    this.router.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }
  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement
      this.product.searchProducts(element.value).subscribe((res)=>{
      
        if(res.length>5){
          res.length = 5
        }
        this.searchResult = res
      })
    }
    
  }
  hideSearch(){
      this.searchResult = undefined 
  }
  submitSearch(val:string){
    this.router.navigate([`search/${val}`])
  }
  redirectToDetails(id:number){
    this.router.navigate(['/product-details/'+id])
  }
}
