import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../shared/environement/enivroment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  usertoken:any 
  constructor(private _HttpClient: HttpClient,@Inject(PLATFORM_ID) private _PLATFORM_ID:any ) {  
    
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this.usertoken = {token : sessionStorage.getItem('token')}
    }else{ this.usertoken = {};
  }
  }

  checkout(c_id:string ,data:object): Observable<any> {
    return this._HttpClient.post(`${env.base}api/v1/orders/checkout-session/${c_id}?url=http://localhost:4200`,{'shippingAddress':data},{headers:this.usertoken});


  }

  
}
