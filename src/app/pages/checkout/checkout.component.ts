import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/order/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
 cartid!:string


 private readonly _PaymentService= inject(PaymentService)
  private readonly _ActivatedRoute= inject(ActivatedRoute)

detailsform:FormGroup = new FormGroup ({
details : new FormControl(null , Validators.required),
phone : new FormControl(null , Validators.required),
city : new FormControl(null , Validators.required),


})



ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
next:(param)=>{
this.cartid = param.get('c_id')!
}


  })
}


details(){
console.log(this.detailsform.value)
if(this.detailsform.valid){


  this._PaymentService.checkout(this.cartid , this.detailsform.value).subscribe({
next:(res)=>{
  console.log(res)
if(res.status == 'success')
{
  window.open(res.session.url , '_self')

}

}



  })
}

}







  

}
