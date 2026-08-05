import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { env } from '../../../shared/environement/enivroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  get usertoken(): any {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      return {token : sessionStorage.getItem('token') || ''};
    } else {
      return {};
    }
  }

  constructor(private _HttpClient: HttpClient, @Inject(PLATFORM_ID) private _PLATFORM_ID: any) {}

  getuserwishlist(): Observable<any> {
    return this._HttpClient.get(`${env.base}/api/v1/wishlist` , {headers :this.usertoken});
  }

  addwishlist(id:string): Observable<any> {
    return this._HttpClient.post(`${env.base}/api/v1/wishlist`,{"productId":id} , {headers :this.usertoken});



  }

  
  removeitemfromwishlist(p_id:string): Observable<any> {
    return this._HttpClient.delete(`${env.base}/api/v1/wishlist/${p_id}`, {headers :this.usertoken});
  }


}
