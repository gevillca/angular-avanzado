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
  getMedicos() {
    return this.http.get(`${base_url}/medicos`, this.headers).pipe(
      map((resp: { ok: boolean; data: Medico[] }) => {
        return resp.data;
      })
    );
  }
  getMedicoById(id: string) {
    return this.http.get(`${base_url}/medicos/${id}`, this.headers).pipe(
      map((resp: { ok: boolean; data: Medico }) => {
        return resp.data;
      })
    );
  }

  createMedico(medico_name: string, medico_hospital_id: string) {
    return this.http.post(
      `${base_url}/medicos`,
      { medico_name, medico_hospital_id },
      this.headers
    );
  }

  updateMedico(medico: Medico, medico_id: string) {
    console.log(medico_id);

    console.log('medicoService', medico);

    return this.http.put(
      `${base_url}/medicos/${medico_id}`,
      medico,
      this.headers
    );
  }
  deleteMedico(_id: string) {
    return this.http.delete(`${base_url}/medicos/${_id}`, this.headers);
  }
}
