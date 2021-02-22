import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medicos.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit {
  public medicos: Medico[] = [];
  constructor(private medicoService: MedicoService) {}

  ngOnInit() {
    this.loadMedico();
  }

  loadMedico() {
    this.medicoService.getMedico().subscribe((resp) => {
      this.medicos = resp;
      console.log(resp);
    });
  }
}
