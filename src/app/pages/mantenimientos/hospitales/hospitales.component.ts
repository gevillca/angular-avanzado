import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospitales.model';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { SearchsService } from '../../../services/searchs.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;
  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private searchService: SearchsService
  ) {}

  ngOnInit(): void {
    this.cargarHospital();
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe((img) => {
      this.cargarHospital();
    });
  }
  //elimina los cambios que se esten escuchando en el listening
  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  cargarHospital() {
    this.cargando = true;
    this.hospitalService.getHospital().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }
  saveChanges(hospital: Hospital) {
    // console.log(hospital.hospital_name);
    // console.log(hospital);

    this.hospitalService
      .updateHospital(hospital.hospital_id, hospital.hospital_name)
      .subscribe((resp) => {
        Swal.fire('Updated', hospital.hospital_name, 'success');
      });
  }
  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: `¿Borrar Hospital?`,
      text: `¿Esta Seguro de Eliminar a ${hospital.hospital_name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService
          .deleteHospital(hospital.hospital_id)
          .subscribe(() => {
            Swal.fire(
              'Hospital borrado!',
              `Hospital ${hospital.hospital_name} fue eliminado correctamente`,
              'success'
            );
            this.cargarHospital();
          });
      }
    });
  }
  //abre una alerta para crear un hospital
  async abrirSweelAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear un Hospital',
      text: 'Ingrese el nuevo nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    });
    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe((resp) => {
        console.log(resp);
        this.cargarHospital();
      });
    }
  }
  //abre un modal para cambiar la imagen
  openModal(hospital: Hospital) {
    this.modalImagenService.openModal(
      'hospitales',
      hospital.hospital_id,
      hospital.hospital_img
    );
  }

  //busca un medico a travez de un termino escrito
  searchHospital(term: string) {
    if (term.length === 0) {
      return this.cargarHospital();
    }

    this.searchService.search('hospitales', term).subscribe((res: any) => {
      this.hospitales = res;
    });
  }
}
