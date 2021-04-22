import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchsService } from '../../services/searchs.service';
import { User } from '../../models/users.models';
import { Hospital } from '../../models/hospitales.model';
import { Medico } from '../../models/medicos.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  public users: User[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private searchsService: SearchsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => {
      this.busquedaGlobal(termino);
    });
  }
  busquedaGlobal(termino: string) {
    this.searchsService.globalSearch(termino).subscribe((resp: any) => {
      console.log(resp);
      this.users = resp.users;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });
  }
}
