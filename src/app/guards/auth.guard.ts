import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.validarToken().pipe(
      tap((estaAutentificado) => {
        if (!estaAutentificado) {
          this.router.navigateByUrl('/login');
        }
      })
    );

    // return false;
  }
}
