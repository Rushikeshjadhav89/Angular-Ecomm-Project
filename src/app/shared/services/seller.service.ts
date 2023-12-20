import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../common-data/data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError =new EventEmitter<boolean>(false)

  // baseURl = 'http://localhost:3000/seller'

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp) {
    this.http.
      post('http://localhost:3000/seller',
        data,
        { observe: 'response' }).
      subscribe((result) => {
        console.warn(result)
        if (result) {
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        }
        // this.isSellerLoggedIn.next(true); 
      })
  }


  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: Login) {
    console.warn(data)
    this.http.get(`http://localhost:3000/seller?email=${data.sMail}&password=${data.sPass}`,
      { observe: 'response' }).subscribe((result: any) => {
        console.warn(result)
        if (result && result.body && result.body.length) {
          console.warn('User logged in')
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        } else {
          console.warn('login failed')
          this.isLoginError.emit(true)
        }
      })
  }
}
