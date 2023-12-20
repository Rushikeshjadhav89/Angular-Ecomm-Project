import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { regExName, regExPrice } from '../../shared/common-data/common-data';
import { ProductService } from '../../shared/services/product.service';
import { product } from '../../shared/common-data/data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent implements OnInit {
  
  addData:any
  pCategory:string =""
  pColor:string = ""
  pPrice:string = ""
  pName:string = ""
  pDescription:string = ""
  pLink:string=''

  addProductMessage:string|undefined

  constructor(private formBuilder: FormBuilder, private product: ProductService, private router: Router){ }
  ngOnInit(): void {
    this.addData = this.formBuilder.group(
      {
        pName : ['',[Validators.required]],
        pPrice : ['',[Validators.required, Validators.pattern(regExPrice)]],
        pColor : ['',[Validators.required]],
        pDescription :['',[Validators.required]],
        pLink : ['',[Validators.required]],
        pCategory : ['',[Validators.required]]

      }
    )
  }

  addProduct(val:product){
    
    this.product.addProduct(val).subscribe((res)=>{
      console.warn(res)
      if(res){
        this.addProductMessage= 'Product is sucessfully added'
        
      }
      setTimeout(()=>(this.addProductMessage= undefined),3000)
      
    })
  }
}
