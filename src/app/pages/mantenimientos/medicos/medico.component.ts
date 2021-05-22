import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospitales.model';
import { MedicoService } from '../../../services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Medico } from '../../../models/medicos.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForms: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoseleccionado: Medico;
  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //sirve para pasar los datos resividos al html usando reactive forms
    this.medicoForms = this.fb.group({
      medico_name: ['', Validators.required],
      medico_hospital_id: ['', Validators.required],
    });
    this.cargarHospital();
    // esta al pendiente de cualquier cambio en medico_hospital_id y lo asigna a hospitalSeleccionado
    this.medicoForms
      .get('medico_hospital_id')
      .valueChanges.subscribe((hospitalID) => {
        this.hospitalSeleccionado = this.hospitales.find(
          (h) => h.hospital_id === hospitalID
        );
      });
    // obtiene el id de los params en el cual esta
    this.activatedRoute.params.subscribe((resp) => {
      this.cargarMedico(resp.id);
    });
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.medicoService.getMedicoById(id).subscribe((medico) => {
      if (!medico) {
        this.router.navigateByUrl(`/dashboard/medicos`);
      }
      const { medico_name, medico_hospital_id } = medico;
      this.medicoseleccionado = medico;
      this.medicoForms.setValue({ medico_name, medico_hospital_id });
    });
  }

  cargarHospital() {
    this.hospitalService.getHospital().subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    });
  }
  guardar() {
    // const { medico_name } = this.medicoForms.value;
    if (this.medicoseleccionado) {
      const id = this.medicoseleccionado.medico_id;

      this.medicoService
        .updateMedico(this.medicoForms.value, id)
        .subscribe((medico: any) => {
          Swal.fire('Updated', medico.data.medico_name, 'success');
        });
    } else {
      this.medicoService
        .createMedico(
          this.medicoForms.value.medico_name,
          this.medicoForms.value.medico_hospital_id
        )
        .subscribe((medico: any) => {
          Swal.fire('Created', this.medicoForms.value.medico_name, 'success');
          this.router.navigateByUrl(
            `/dashboard/medico/${medico.data.medico_id}`
          );
        });
    }
  }
}
