import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospitales.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient, private router: Router) {}

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
  // obtine los hospitales, y usa el pipe y map solo para obtener los hospitales sin el ok:true
  getHospital() {
    return this.http.get(`${base_url}/hospitales`, this.headers).pipe(
      map((resp: { ok: boolean; data: Hospital[] }) => {
        return resp.data;
      })
    );
  }
  createHospital(hospital_name: string) {
    return this.http.post(
      `${base_url}/hospitales`,
      { hospital_name },
      this.headers
    );
  }
  updateHospital(hospital_id: string, hospital_name: string) {
    console.log(hospital_name);
    console.log(hospital_id);
    return this.http.put(
      `${base_url}/hospitales/${hospital_id}`,
      { hospital_name },
      this.headers
    );
  }
  deleteHospital(_id: string) {
    return this.http.delete(`${base_url}/hospitales/${_id}`, this.headers);
  }
}
