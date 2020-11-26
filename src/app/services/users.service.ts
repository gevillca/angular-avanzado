import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { RegisterForm } from '../interfaces/register-form-interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
const base_url = environment.base_url;

declare const gapi: any;
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public auth2: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInnit();
  }

  googleInnit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '448148819173-hv66qid3ac79jm6lsecdc2fltja28ia7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
      console.log('User signed out.');
    });
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token' || '');
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          console.log(resp);

          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        catchError((err) => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
}
