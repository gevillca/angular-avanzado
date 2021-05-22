import { HospitalService } from './hospital.service';
import { Injectable } from '@angular/core';
import { Medico } from '../models/medicos.model';
import { environment } from '../../environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class PdfModalService {
  private _hideModal = true;

  public medico_img: string;
  public medico_name: string;
  public medico_img64: any;
  public hospital_name: string;
  get hideModal() {
    return this._hideModal;
  }
  constructor(private hospitalService: HospitalService) {}
  cerrarModal() {
    this._hideModal = true;
  }

  async getDataBlob(medico_img) {
    var res = await fetch(medico_img);
    var blob = await res.blob();
    var uri = await this.parseURI(blob);
    return uri;
  }
  async parseURI(d) {
    var reader = new FileReader();
    reader.readAsDataURL(d);
    return new Promise((res, rej) => {
      reader.onload = (e) => {
        res(e.target.result);
      };
    });
  }

  abrirlModal(medico: Medico, tipo: 'users' | 'hospitales' | 'medicos') {
    this._hideModal = false;
    this.medico_img = medico.medico_img;
    this.medico_name = medico.medico_name;
    this.hospitalService
      .getHospitalID(medico.medico_hospital_id)
      .subscribe((hospital: any) => {
        this.hospital_name = hospital.hospital_name;
      });

    if (this.medico_img.includes('https')) {
      this.medico_img = this.medico_img;
    } else {
      this.medico_img = `${base_url}/upload/${tipo}/${this.medico_img}`;
    }
    this.getDataBlob(this.medico_img).then(
      (data) => (this.medico_img64 = data)
    );
  }
}
