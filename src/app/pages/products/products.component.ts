import { Component, inject } from '@angular/core';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { IProduct } from '../../core/interfaces/product';
import { ProductService } from '../../core/services/products/product.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [SearchPipe, FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  productdata!: IProduct[];
  productid!: Subscription;
  searchvalue: string = '';

  ngOnInit(): void {
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
        this.toastr.success(res.message, 'freshcart');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }



  ngOnDestroy(): void {
    this.productid?.unsubscribe;
  }






}
