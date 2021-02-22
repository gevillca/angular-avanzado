import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForms: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.medicoForms = this.fb.group({
      medico_name: ['Hernan', Validators.required],
      medico_hospital_id: ['2', Validators.required],
    });
  }
}
