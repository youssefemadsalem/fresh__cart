import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/products/product.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-catodetails',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './catodetails.component.html',
  styleUrl: './catodetails.component.scss'
})
export class CatodetailsComponent implements OnDestroy, OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  categoryId!: string;
  specsub!: Subscription;
  categoryDetails!: IProduct[];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('c_id')!;
        this.fetchCategoryProducts();
      },
    });
  }

  fetchCategoryProducts() {
    this.specsub = this._ProductService.getproductincategories(this.categoryId).subscribe({
      next: (res) => {
        this.categoryDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      }
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
      }
    });
  }

  ngOnDestroy(): void {
    this.specsub?.unsubscribe();
  }
}
