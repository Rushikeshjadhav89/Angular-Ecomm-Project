import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { cart, product } from '../../shared/common-data/data-type';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productDetails: undefined | product
  productQuantity: number = 1
  removeCart = false
  cartData: product | undefined


  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId')
    productId && this.product.getProduct(productId).subscribe((res) => {
     
      this.productDetails = res


      let cartData = localStorage.getItem('localCart')
      if (productId && cartData) {
        let items = JSON.parse(cartData)
        items = items.filter((item: product) => productId == item.id.toString())
        if (items.length) {
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }


      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id
        this.product.getCartList(userId)
        this.product.cartData.subscribe((res) => {
          let item = res.filter(
            (item: product) =>
              productId?.toString() === item.productId?.toString()
          );
          if (item.length) {
            this.cartData = item[0]
            this.removeCart = true
          }
        })
      }

    })
  }



  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity = this.productQuantity + 1
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity = this.productQuantity - 1
    }
  }

  AddToCart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.productQuantity
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productDetails)
        this.removeCart = true
      } else {
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        let cartData: cart = {
          ...this.productDetails,
          userId,
          productId: this.productDetails.id,

        }
        delete cartData.id
        this.product.addToCart(cartData).subscribe((res) => {
          if (res) {
            this.product.getCartList(userId)
            this.removeCart = true
          }

        })


      }
    }
  }
  RemoveToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId)
    } else {
     
      console.warn("cartData",this.cartData);
      this.cartData && this.product.removeToCart(this.cartData?.id)
      .subscribe((res)=>{
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        this.product.getCartList(userId)
      })

    }
    this.removeCart = false
  }
}
