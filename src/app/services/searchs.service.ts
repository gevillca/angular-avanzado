import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/users.models';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SearchsService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token' || '');
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private transformarUsuarios(res: any[]): User[] {
    return res.map(
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
  }

  search(tipo: 'users' | 'medicos' | 'hospitales', term: string) {
    return this.http
      .get(`${base_url}/todo/collection/${tipo}/${term}`, this.headers)
      .pipe(
        map((res: any) => {
          switch (tipo) {
            case 'users':
              return this.transformarUsuarios(res.data);

            default:
              break;
          }
        })
      );
  }
}
