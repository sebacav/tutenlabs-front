import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login/login.service'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// Este Guard, nos permite validar si existe o no el usuario logueado
// Es llamado desde los Path, a modo de poder validar si el usuario ya esta logueado
// para permitir el acceso en este caso, a la vista '/booking'
export class AuthGuard implements CanActivate {

  constructor(private login: LoginService, private router: Router){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.login.isLoggedIn()){
        return true;
      }else{
        this.router.navigate([""]);
        return false;
      }
  }
  
}
