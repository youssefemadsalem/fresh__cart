import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../shared/environement/enivroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  usertoken:any = {token : sessionStorage.getItem('token')}
  constructor(private _HttpClient: HttpClient) { }

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
