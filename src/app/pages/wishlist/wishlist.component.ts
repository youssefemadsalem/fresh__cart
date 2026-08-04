import { Component, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWish } from '../../core/interfaces/iwish';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  private readonly _WishlistService= inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  wishlistdata!:IWish[];
  ngOnInit(): void {
    
    this._WishlistService.getuserwishlist().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishlistdata = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  remove(id:string) {

    this._WishlistService.removeitemfromwishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistdata = res.data;
        this._WishlistService.getuserwishlist().subscribe({
          next: (res) => {
            console.log(res.data);
            this.wishlistdata = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }


  addtocart(id: string) {
    this._CartService.addproducttocart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message, 'freshcart');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
