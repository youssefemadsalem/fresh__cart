import { OwlOptions } from './../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { subscribe } from 'diagnostics_channel';
import { IProduct } from '../../core/interfaces/product';
import { ProductService } from './../../core/services/products/product.service';
import { Component, inject, NgModule, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CatoService } from '../../core/services/cato/cato.service';
import { Icato } from '../../core/interfaces/icato';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, FormsModule, SearchPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private toastr: ToastrService){}
  private readonly _ProductService = inject(ProductService);
  private readonly _Productcato = inject(CatoService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  productdata!: IProduct[];
  checked: boolean = false;
  unchecked: boolean = true;
  searchvalue: string = '';
  catodata!: Icato[];
  productid!: Subscription;
  catoid!: Subscription;

  customOptions: OwlOptions = {
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
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1200: {
        items: 6,
      },
    },
    nav: false,
  };

  staticOptions: OwlOptions = {
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
    this.catoid = this._Productcato.getallcato().subscribe({
      next: (res) => {
        this.catodata = res.data;
        console.log(this.catodata);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });

    this.productid = this._ProductService.getallproducts().subscribe({
      next: (res) => {
        this.productdata = res.data;
        console.log(this.productdata);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  addtocart(p_id: string) {
    this._CartService.addproducttocart(p_id).subscribe({
      next: (res) => {
        console.log(res);


        this.toastr.success(res.message ,'freshcart')
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addtowishlist(p_id: string) {
    this._WishlistService.addwishlist(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message ,'freshcart')
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.productid?.unsubscribe();
    this.catoid?.unsubscribe();
  }
}
