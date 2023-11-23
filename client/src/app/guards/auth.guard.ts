import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const _route = new Router();
  if ( inject(AuthService).isAuth ) {
    return true
  }else{
    _route.navigate(['/login'])
    return false
  }
  // return true
};
