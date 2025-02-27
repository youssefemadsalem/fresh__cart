import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { stringify } from 'querystring';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe ,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly CartService = inject(CartService);

  cartdata!: ICart;

  ngOnInit(): void {
    this.CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartdata = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  remove(id: string) {
    this.CartService.removeitem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartdata = res.data;
      },
    });
  }

update(id:string ,count:number){
  


  this.CartService.updateitem(id, count).subscribe({
next:(res)=>{
  console.log(res.data)
  this.cartdata = res.data 

}



  })
}




}
