import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, uLogin } from '../common-data/data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invaliduserAuth = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  userSignup(user:SignUp){
   this.http.post('http://localhost:3000/user', user,{observe:'response'})
   .subscribe((res)=>{
    console.log(res);
    if(res){
      localStorage.setItem("user",JSON.stringify(res.body))
      this.router.navigate(['/'])
    }
   })
  }

  userLogin(data:uLogin){
    this.http.get<SignUp[]>(`http://localhost:3000/user?email=${data.uMail}&password=${data.uPass}`,{observe:'response'}).
    subscribe((res)=>{
      if(res && res.body?.length){
        localStorage.setItem("user",JSON.stringify(res.body[0]))
      this.router.navigate(['/'])
      this.invaliduserAuth.emit(false)
      }else{
       this.invaliduserAuth.emit(true)
      }
    })


  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
}
