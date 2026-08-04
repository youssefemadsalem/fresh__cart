import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { env } from '../../../shared/environement/enivroment';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  usertoken:any 
  constructor(private _HttpClient: HttpClient,@Inject(PLATFORM_ID) private _PLATFORM_ID:any ) { 
    
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this.usertoken = {token : sessionStorage.getItem('token')}
    }else{ this.usertoken = {}}
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${env.base}/api/v1/cart` , {headers :this.usertoken}).pipe(
      tap((res: any) => this.cartNumber.next(res.numOfCartItems))
    );
  }


  addproducttocart(id:string): Observable<any> {
    return this._HttpClient.post(`${env.base}/api/v1/cart`,{"productId":id} , {headers :this.usertoken}).pipe(
      tap((res: any) => this.cartNumber.next(res.numOfCartItems))
    );
  }



  removeitem(id:string): Observable<any> {
    return this._HttpClient.delete(`${env.base}/api/v1/cart/${id}`, {headers :this.usertoken}).pipe(
      tap((res: any) => this.cartNumber.next(res.numOfCartItems))
    );
  }


  updateitem(id:string ,count:number): Observable<any> {
    return this._HttpClient.put(`${env.base}/api/v1/cart/${id}`, {"count":count} , {headers:this.usertoken} ).pipe(
      tap((res: any) => this.cartNumber.next(res.numOfCartItems))
    );
  }



}

