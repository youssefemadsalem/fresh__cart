import { env } from './../../../shared/environement/enivroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _HttpClient: HttpClient) {}

  getallproducts(): Observable<any> {
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/products'
    );
  }

  getspcproducts(id: string): Observable<any> {
    return this._HttpClient.get(`${env.base}/api/v1/products/${id}`);
  }

  getproductinbrands(value: string): Observable<any> {
    return this._HttpClient.get(`${env.base}/api/v1/products`, {
      params: { brand: value },
    });
  }





  
}
