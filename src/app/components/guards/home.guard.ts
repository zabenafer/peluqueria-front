import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../dashboard/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  //Esta clase guard valida que si no esta logeado no pueda ingresar al sistema o al home.

  constructor( private router: Router,
    private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      var isAuth = this.authService.isAuth();
      console.log(isAuth);
      if(!isAuth) {
        this.router.navigate(['/']);
        return false;
      }
    return true;
  }

}
