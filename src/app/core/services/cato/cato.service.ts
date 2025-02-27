import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatoService {

  constructor(private _HttpClient:HttpClient) { 
  }


  getallcato():Observable<any>{

    
return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/categories")


  }

  





}
