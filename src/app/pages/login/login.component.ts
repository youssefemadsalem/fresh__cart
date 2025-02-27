import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthincationService } from '../../core/services/auth/authincation.service';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  alreadyexist!: string;
  private readonly _AuthincationService = inject(AuthincationService);
  private readonly _Router = inject(Router);
  loginform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  login() {
    if (this.loginform.invalid) {
      this.loginform.markAllAsTouched();
    } else {
    


           
      console.log(this.loginform);
      this._AuthincationService.sighin(this.loginform.value).subscribe({
        next: (res) => {
sessionStorage.setItem('token', res.token)

          console.log(res);

this._AuthincationService.decode()





          this._Router.navigate(["/home"])
          

          
        },
        error: (err) => {
          this.alreadyexist = err.error.message;
        },
      });



    }
  }
}
