import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }
  // @Input() progreso: number = 78;
  @Input('valor') progreso: number = 78;

  @Input() btnClass: string = ' btn-primary';
  // @Output() valorSalida: EventEmitter<number> = new EventEmitter();
  // para que tengan el mismo nombre en input y output y tenga mas sentido el nombre
  @Output() valor: EventEmitter<number> = new EventEmitter();

  get getPorcentaje() {
    return `${this.progreso}%`;
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valor.emit(100);
      return (this.progreso = 100);
    }
    if (this.progreso <= 0 && valor < 0) {
      this.valor.emit(0);
      return (this.progreso = 0);
    }
    this.progreso = this.progreso + valor;
    this.valor.emit(this.progreso);
  }
  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valor.emit(this.progreso);
  }
}
