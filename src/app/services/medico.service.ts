import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Medico } from '../models/medicos.model';
import { map } from 'rxjs/operators';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class MedicoService {
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

  // obtine los medicos, y usa el pipe y map solo para obtener los medicos sin el ok:true
  getMedico() {
    return this.http.get(`${base_url}/medicos`, this.headers).pipe(
      map((resp: { ok: boolean; data: Medico[] }) => {
        return resp.data;
      })
    );
  }
}
