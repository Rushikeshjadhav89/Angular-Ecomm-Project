import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { product } from '../../shared/common-data/data-type';
import { regExPrice } from '../../shared/common-data/common-data';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit {

  uProduct: any
  pCategory: string = ""
  pColor: string = ""
  pPrice: string = ""
  pName: string = ""
  pDescription: string = ""
  pLink: string = ''

  productMessage: undefined | string

  productData: undefined | product

  constructor(private product: ProductService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    // this.uProduct = this.formBuilder.group(
    //   {
    //     pName : ['',[Validators.required]],
    //     pPrice : ['',[Validators.required, Validators.pattern(regExPrice)]],
    //     pColor : ['',[Validators.required]],
    //     pDescription :['',[Validators.required]],
    //     pLink : ['',[Validators.required]],
    //     pCategory : ['',[Validators.required]]
    //   }

    // )

    let productId = this.route.snapshot.paramMap.get('id')
    console.log(productId)
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.log(data)
      this.productData = data
    })
  }
  upProduct(val: product) {
    console.log(val)
    if(this.productData){
      val.id = this.productData.id
    }
    this.product.updateProduct(val).subscribe((res) => {
      if (res) {
        this.productMessage = "Product has Updated"
      }
    })
    setTimeout(() => {
      this.productMessage = undefined
      this.router.navigate(['/seller-home'])
    }, 3000)


  }

}
