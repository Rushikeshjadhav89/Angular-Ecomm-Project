import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cart, check, product } from '../common-data/data-type';
import { Output, EventEmitter } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[] | []>()


  constructor(private http: HttpClient) { }
  addProduct(val: product) {
    return this.http.post('http://localhost:3000/products', val)
  }
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products')
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(product:product){
  return  this.http.put<product>(`http://localhost:3000/products/${product.id}`, product)
  }
  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3')
  }
  trendyProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=14')
  }
  searchProducts(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }
  localAddToCart(val:product){
    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([val]))
      this.cartData.emit([val])
    }else{
      cartData = JSON.parse(localCart)
      cartData.push(val)
      localStorage.setItem('localCart', JSON.stringify(cartData))     
    }
    // cartData.emit(cartData)
    this.cartData.emit(cartData)
  }
  removeItemFromCart(productId:number){
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      let items:product[]=JSON.parse(cartData)
      items = items.filter((item:product)=>productId!==item.id)
      console.log(items);
      localStorage.setItem('localCart', JSON.stringify(items)) 
      this.cartData.emit(items)
    }
  }

  addToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart', cartData)
  }
  getCartList(userId:number){
    return this.http.get<product[]>('http://localhost:3000/cart?userId=' + userId,
    {observe:'response'}).subscribe((res)=>{
      console.log(res);
      
      if(res && res.body){
      this.cartData.emit(res.body)
    }
    })
  }
  removeToCart(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+cartId)
  }
  currentCart(){
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore)
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id)
  }
  orderNow(val:check){
    return this.http.post('http://localhost:3000/orders', val)
  }
  orderList(){
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore)
  return  this.http.get<check[]>('http://localhost:3000/orders?userId='+userData.id)
  }

  deleteCartItems(cartId:number){
  return  this.http.delete('http://localhost:3000/cart/' + cartId,{observe:'response'}).subscribe((res)=>{
    if(res){
      this.cartData.emit([])
    }
    })
  }
  cancelOrder(orderId:number){
  return this.http.delete('http://localhost:3000/orders/' +orderId)
  }

}
