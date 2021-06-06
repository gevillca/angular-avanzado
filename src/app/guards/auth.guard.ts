import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private userService: UsersService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.userService.validarToken().pipe(
      tap((estaAutentificado) => {
        if (!estaAutentificado) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
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
