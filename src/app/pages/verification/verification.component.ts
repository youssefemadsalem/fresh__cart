import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthincationService } from '../../core/services/auth/authincation.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-verification',
  imports: [ReactiveFormsModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss',
})
export class VerificationComponent {
  private readonly _AuthincationService = inject(AuthincationService);
  private readonly _Router = inject(Router);

  error: string = '';
  spinner: boolean = false;
  send: boolean = true;

  verifyform: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

  verify() {
    if (this.verifyform.invalid) {
      this.verifyform.markAllAsTouched();
    } else {
      this.spinner = true;
      this.send = false;
      this._AuthincationService.Verify(this.verifyform.value).subscribe({
        next: (res) => {

          
           console.log(res);

          sessionStorage.setItem('token', res.token);
            
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          this.error = err.error.message;
          this.spinner = false;
          this.send = true;
        },
      });
    }
  }
}
