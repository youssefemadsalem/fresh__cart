import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthincationService } from '../../core/services/auth/authincation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  private readonly _AuthincationService = inject(AuthincationService);
  private readonly _Router = inject(Router);

  error:string=""
  spinner: boolean = false;
  send: boolean = true;

    forgetform: FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });


    forget(){

      if (this.forgetform.invalid) {
        this.forgetform.markAllAsTouched();
      } else {
        this.spinner= true;
        this.send= false;
        this._AuthincationService.forget(this.forgetform.value).subscribe({
          next: (res) => {
             this._Router.navigate(["/verify"])
          },
          error: (err) => {

           this.error = err.error.message;
           this.spinner= false;
           this.send= true;
            ;
          },
        });
  
  
  
      }





    }

}
