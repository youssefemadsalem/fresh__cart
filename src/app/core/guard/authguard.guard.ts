import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authguardGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _ToastrService = inject(ToastrService);
  const _PLATFORM_ID = inject(PLATFORM_ID);
  
  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (sessionStorage.getItem('token')) {
      return true;
    } else {
      _ToastrService.warning('You must be logged in to access this page', 'Unauthorized');
      _Router.navigate(['/login']);
      return false;
    }
  }
  
  return false;
};
