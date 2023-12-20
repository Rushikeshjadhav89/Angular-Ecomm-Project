import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUp, cart, product, uLogin } from '../../shared/common-data/data-type';
import { regExMail, regExName, regExPass } from '../../shared/common-data/common-data';
import { UserService } from '../../shared/services/user.service';
import { ProductService } from '../../shared/services/product.service';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit{


  user_Data:any
  user_login:any

  name:any
  password:any
  Email:any

  uPass:any
  uMail:any

  uShowPage: boolean = true
  authEroor:string = ''

  constructor(private formBuilder: FormBuilder, private user: UserService, private product:ProductService){ }
  ngOnInit(): void {
    this.user_Data = this.formBuilder.group(
      {
        name:['',[Validators.required, Validators.pattern(regExName)]],
        Email:['',[Validators.required, Validators.pattern(regExMail)]],
        password:['',[Validators.required, Validators.pattern(regExPass)]]
      }
    )

    this.user_login = this.formBuilder.group(
      {
        uMail: ['',[Validators.required, Validators.pattern(regExMail)]],
        uPass: ['',[Validators.required, Validators.pattern(regExPass)]]
      }
    )


      this.user.userAuthReload()
  }

  uData(val:SignUp){
    console.log(val)
    this.user.userSignup(val)

  }
  uSubmit(val:uLogin){
    this.user.userLogin(val)
    this.user.invaliduserAuth.subscribe((res)=>{
      console.log(res);
      if(res){
        this.authEroor = "User not found"
      }else{
        this.localCartToRemoteCart()
      }
      
    })
    
  }
  openLogin(){
    this.uShowPage = false
  }
  openSignup(){
    this.uShowPage = true

  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(data){
      let cartDataList:product[] = JSON.parse(data);

      cartDataList.forEach((product:product, index) => {
        let cartData:cart = {
          ...product,
          productId:product.id,
          userId
        }
        delete cartData.id
        setTimeout(() =>{
          this.product.addToCart(cartData).subscribe((res)=>{
            if(res){
              console.log('item Stored in DB');   
            }
          })
          
        }, 500)
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        }
      })
    }

    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);

    
  }
 
}
