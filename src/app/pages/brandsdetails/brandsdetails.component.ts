import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/products/product.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/product';
import { IBrands } from '../../core/interfaces/brands';
import { Branddetails } from '../../core/interfaces/branddetails';

@Component({
  selector: 'app-brandsdetails',
  imports: [],
  templateUrl: './brandsdetails.component.html',
  styleUrl: './brandsdetails.component.scss'
})
export class BrandsdetailsComponent  implements OnDestroy , OnInit{


 private readonly _ActivatedRoute = inject(ActivatedRoute);


 brandid!: string;
  private readonly _ProductServic = inject(ProductService);
  specsub!:Subscription
 brandsdetail!:Branddetails[]

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandid = params.get('b_id')!;
       
      },
    });

  this.specsub  =  this._ProductServic.getproductinbrands(this.brandid).subscribe({
next:(res)=>{
  this.brandsdetail=res.data
  console.log(this.brandsdetail)
}

    })

  }


ngOnDestroy(): void {
  this.specsub.unsubscribe
}






}
