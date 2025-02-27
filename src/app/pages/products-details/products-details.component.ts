import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/products/product.service';
import { IProduct } from '../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-products-details',
  imports: [CarouselModule],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss',
})
export class ProductsDetailsComponent implements OnInit ,OnDestroy {
  private readonly _ProductServic = inject(ProductService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
   private readonly _CartService = inject(CartService);
  productid!: string;
  productsdetail:IProduct = {} as IProduct

specsub!:Subscription



customOptionsfordetails: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };



  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productid = params.get('p_id')!;
       
      },
    });

  this.specsub  =  this._ProductServic.getspcproducts(this.productid).subscribe({
next:(res)=>{
  this.productsdetail=res.data
}

    })














  }





  addtocart(p_id:string){

    this._CartService.addproducttocart(p_id).subscribe({
  next:(res)=>{
  console.log(res)
  
  
  
  },
  error:(err)=>{
    console.log(err)
    
    
    
    }
  
  
  
  
  
    })
  }




  ngOnDestroy(): void {
    this.specsub.unsubscribe
  }
}
