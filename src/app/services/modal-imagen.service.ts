import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _hideModal = true;
  public tipo: string;
  public user_id: string;
  public user_img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get hideModal() {
    return this._hideModal;
  }

  openModal(
    tipo: 'users' | 'hospitales' | 'medicos',
    user_id: string,
    user_img: string
  ) {
    this.tipo = tipo;
    this.user_id = user_id;
    this.user_img = user_img;
    this._hideModal = false;

    // user_img = 'no-img';
    if (user_img.includes('https')) {
      this.user_img = user_img;
    } else {
      this.user_img = `${base_url}/upload/${tipo}/${user_img}`;
    }
  }
  closeModal() {
    this._hideModal = true;
  }

  constructor() {}
}
