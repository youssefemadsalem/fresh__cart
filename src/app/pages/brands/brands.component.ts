import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../core/interfaces/brands';
import { Subscription } from 'rxjs';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import {FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router';
import { IProduct } from '../../core/interfaces/product';
@Component({
  selector: 'app-brands',
  imports: [FormsModule,RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit, OnDestroy {
  private readonly _BrandsService = inject(BrandsService);
   productdata!:IProduct[];

  branditems!: IBrands[];
  brandID!:Subscription;
searchvalues:string="";

  ngOnInit(): void {
    this.brandID=this._BrandsService.getallcbrands().subscribe({
      next: (res) => {
        this.branditems=res.data
        console.log(this.branditems);
      },
    });
  }
  ngOnDestroy(): void {

this.brandID?.unsubscribe();


  }
}
