import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { RegisterForm } from '../interfaces/register-form-interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/users.models';
import { helpers } from 'chart.js';
import { LoadUser } from '../interfaces/users-form.interface';
const base_url = environment.base_url;

declare const gapi: any;
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public auth2: any;
  public usuario: User;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInnit();
  }
  get token(): string {
    return localStorage.getItem('token' || '');
  }

  get user_id(): string {
    return this.usuario.user_id;
  }
  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.user_role;
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }
  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  googleInnit() {
    return new Promise<void>((resolve) => {
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
    localStorage.removeItem('menu');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
      console.log('User signed out.');
    });
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          // console.log('resp', resp.user);
          const {
            user_name,
            user_email,
            user_google,
            user_role,
            user_state,
            user_created,
            user_updated,
            user_id,
          } = resp.user;
          const user_img = resp.user.user_img || 'ss';
          this.usuario = new User(
            user_name,
            user_email,
            '',
            user_google,
            user_img,
            user_role,
            user_state,
            user_created,
            user_updated,
            user_id
          );

          this.guardarLocalStorage(resp.token, resp.menu);
          console.log('menu usuario:', resp.menu);

          // localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((err) => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        // localStorage.setItem('token', resp.token);
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }
  updatedProfile(data: {
    // user_name: string;
    // user_email: string;
    // user_role: string;
  }) {
    return this.http.put(
      `${base_url}/users/${this.user_id}`,
      data,
      // (data = { ...data, user_role: this.usuario.user_role }),
      this.headers
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        // localStorage.setItem('token', resp.token);
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }
  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        // localStorage.setItem('token', resp.token);
        this.guardarLocalStorage(resp.token, resp.menu);

        console.log('menu usuario:', resp.menu);
      })
    );
  }

  getUsers(desde: number = 0) {
    return this.http
      .get<LoadUser>(`${base_url}/users?desde=${desde}`, this.headers)
      .pipe(
        map((res) => {
          const usuarios = res.data.map(
            (usuario) =>
              new User(
                usuario.user_name,
                usuario.user_email,
                '',
                usuario.user_google,
                usuario.user_img,
                usuario.user_role,
                usuario.user_state,
                usuario.user_created,
                usuario.user_updated,
                usuario.user_id
              )
          );

          return {
            total: res.total,
            data: usuarios,
          };
        })
      );
  }

  deleteUser(user_id: string) {
    return this.http.delete(`${base_url}/users/${user_id}`, {
      headers: { 'x-token': this.token },
    });
  }
  saveUserRole(user: User) {
    return this.http.put(
      `${base_url}/users/${user.user_id}`,
      user,
      // (data = { ...data, user_role: this.usuario.user_role }),
      this.headers
    );
  }
}
