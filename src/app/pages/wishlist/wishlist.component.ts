import { subscribe } from 'diagnostics_channel';
import { Component, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../core/interfaces/product';
import { RouteReuseStrategy, RouterLink } from '@angular/router';
import { ICart } from '../../core/interfaces/icart';
import { IWish } from '../../core/interfaces/iwish';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  private readonly _WishlistService= inject(WishlistService);
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
      },
    });
  }




}
