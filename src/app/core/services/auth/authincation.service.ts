import { VerificationComponent } from './../../../pages/verification/verification.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../shared/environement/enivroment';
import { jwtDecode } from "jwt-decode";



@Injectable({
  providedIn: 'root',
})
export class AuthincationService {
  constructor(private _HttpClient: HttpClient) {}
x !:any

decode(){

if(sessionStorage.getItem('token')){
  this.x = jwtDecode(sessionStorage.getItem('token')!)
  console.log(this.x)
}


}

  
  sighup(data: object): Observable<any> {
    return this._HttpClient.post(`${env.base}/api/v1/auth/signup`, data);
  }

  sighin(data: object): Observable<any> {
    return this._HttpClient.post(`${env.base}/api/v1/auth/signin`, data);
  }


  forget(data: object): Observable<any> {
    return this._HttpClient.post(`${env.base}/api/v1/auth/forgotPasswords`, data);
  }


  Verify(data: object): Observable<any> {
    return this._HttpClient.post(`${env.base}/api/v1/auth/verifyResetCode`, data);
  }






}
