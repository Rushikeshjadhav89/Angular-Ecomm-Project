import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { product } from '../../shared/common-data/data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchResult:undefined | product[]

  constructor(private activeRoute: ActivatedRoute, private product: ProductService){ }
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query') 
    query && this.product.searchProducts(query).subscribe((res)=>{
      this.searchResult = res
    })
  }
}
