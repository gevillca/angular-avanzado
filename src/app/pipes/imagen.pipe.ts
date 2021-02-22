import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';
const base_url = environment.base_url;
@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: 'users' | 'medicos' | 'hospitales'): string {
    const image = img;
    if (!image) {
      return `${base_url}/upload/${tipo}/no-image`;
    }

    if (image.includes('https')) {
      return image;
    }

    if (image) {
      return `${base_url}/upload/${tipo}/${image}`;
    } else {
      return `${base_url}/upload/${tipo}/no-image`;
    }
    // return 'img' + img + 'tipo' + tipo;
  }
}
