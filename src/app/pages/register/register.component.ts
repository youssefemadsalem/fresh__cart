import { AuthincationService } from './../../core/services/auth/authincation.service';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly _AuthincationService = inject(AuthincationService);
  private readonly _Router = inject(Router);
  alreadyexist!: string;
  spinner: boolean = false;
  signup: boolean = true;
  registerform: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\w{6,}$/),
      ]),
      rePassword: new FormControl(null),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.compare
  );

  register(): void {
    if (this.registerform.invalid) {
      this.registerform.markAllAsTouched();
    } else {
      this.signup = false;
      this.spinner = true;
      this.alreadyexist = '';
      this._AuthincationService.sighup(this.registerform.value).subscribe({
        next: (res) => {
          console.log(res);
          this._Router.navigate(["/login"])
          this.signup = true;
          this.spinner = false;
        },
        error: (err) => {
          this.alreadyexist = err.error.message;
          this.signup = true;
          this.spinner = false;
        },
      });
    }
  }

  compare(fgroup: AbstractControl) {
    if (fgroup.get('password')?.value === fgroup.get('rePassword')?.value) {
      return null; // no error
    } else {
      return { missmatch: true };
    }
  }
}
