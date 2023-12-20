import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../shared/services/product.service';
import { product } from '../../shared/common-data/data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
 popularProduct:undefined | product[]
 trendyProducts: undefined | product[]
 
  constructor(private product:ProductService){ }
 ngOnInit(): void {
   this.product.popularProducts().subscribe((res)=>{
    
    this.popularProduct = res
   })
   this.product.trendyProducts().subscribe((res)=>{
    this.trendyProducts = res
   })
 }
  }


