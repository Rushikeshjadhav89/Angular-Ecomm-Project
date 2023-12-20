import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { regExMail } from '../../shared/common-data/common-data';
import { regExName } from '../../shared/common-data/common-data';
import { regExPass } from '../../shared/common-data/common-data';
import { SellerService } from '../../shared/services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../../shared/common-data/data-type';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {
  
  authError:string = ""
  sellerData:any
  name:any
  password:any
  Email:any
  empData:any
  loginData:any
  sMail:any
  sPass:any

  showLogin :boolean =  true

  constructor(private formBuilder : FormBuilder, private seller: SellerService, private router: Router){ }

  ngOnInit(): void {
    
    this.empData = this.formBuilder.group(
      {
      name:['',[Validators.required, Validators.pattern(regExName)]],
      Email:['',[Validators.required, Validators.pattern(regExMail)]],
      password:['',[Validators.required, Validators.pattern(regExPass)]]
    }
    )

    this.loginData = this.formBuilder.group(
      {
      
      sMail:['',[Validators.required, Validators.pattern(regExMail)]],
      sPass:['',[Validators.required, Validators.pattern(regExPass)]]
    }
    )

    this.seller.reloadSeller()
     
  }

  addData(val:SignUp){
    this.seller.userSignUp(val)
  }

  logData(val:Login){
    this.authError = "";
    // console.warn(val)
    this.seller.userLogin(val)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = "Email or Password is not correct"
      }
    })
  }

  openLogin(){
    this.showLogin = false
  }
  
  opensignUp(){
    this.showLogin = true
  }


}
