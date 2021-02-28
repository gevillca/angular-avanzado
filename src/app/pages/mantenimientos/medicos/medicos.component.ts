import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medicos.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { SearchsService } from '../../../services/searchs.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public imgSubs: Subscription;
  constructor(
    private medicoService: MedicoService,
    private modalImagenService: ModalImagenService,
    private searchService: SearchsService
  ) {}
  //elimina los cambios que se esten escuchando en el listening
  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  ngOnInit() {
    this.cargarMedico();
    this.imgSubs = this.modalImagenService.nuevaImagen.subscribe((img) => {
      this.cargarMedico();
    });
  }

  cargarMedico() {
    this.cargando = true;
    this.medicoService.getMedicos().subscribe((medico) => {
      this.cargando = false;
      this.medicos = medico;
    });
  }
  //abre un modal para cambiar la imagen
  openModal(medico: Medico) {
    this.modalImagenService.openModal(
      'medicos',
      medico.medico_id,
      medico.medico_img
    );
  }

  //busca un medico a travez de un termino escrito
  searchMedico(term: string) {
    if (term.length === 0) {
      return this.cargarMedico();
    }

    this.searchService.search('medicos', term).subscribe((res: any) => {
      this.medicos = res;
    });
  }

  deleteMedico(medico: Medico) {
    Swal.fire({
      title: `¿Borrar Un Medico?`,
      text: `¿Esta Seguro de Eliminar a ${medico.medico_name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.deleteMedico(medico.medico_id).subscribe(() => {
          Swal.fire(
            'Medico borrado!',
            `Medico ${medico.medico_name} fue eliminado correctamente`,
            'success'
          );
          this.cargarMedico();
        });
      }
    });
  }
}
