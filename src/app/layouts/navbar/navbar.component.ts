import { AuthincationService } from './../../core/services/auth/authincation.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { CartService } from './../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  readonly _AuthincationService = inject(AuthincationService)
  readonly _CartService = inject(CartService)
  private readonly _= inject(Router)
  private readonly platformId = inject(PLATFORM_ID)
  
  cartCount: number = 0;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this._AuthincationService.decode();
      this._CartService.cartNumber.subscribe({
        next: (num) => this.cartCount = num
      });
      // Initial fetch if authenticated
      if (this._AuthincationService.x) {
        this._CartService.getLoggedUserCart().subscribe();
      }
    }
  }

logout () {
 sessionStorage.removeItem('token')
 this._.navigate(['/login'])
 this._AuthincationService.x=null





}









}
