import { AuthincationService } from './../../core/services/auth/authincation.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
private readonly _AuthincationService = inject(AuthincationService)
private readonly _= inject(Router)

logout () {
 sessionStorage.removeItem('token')
 this._.navigate(['/login'])
 this._AuthincationService.x=null





}









}
