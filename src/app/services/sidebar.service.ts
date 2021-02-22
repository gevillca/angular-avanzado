import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard..',
      icono: 'fas fa-fire',
      submenu: [
        {
          titulo: 'main',
          url: '/',
        },
        {
          titulo: 'progress',
          url: 'progress',
        },
        {
          titulo: 'graficas',
          url: 'grafica1',
        },
      ],
    },
    {
      titulo: 'Mantenimientos',
      icono: 'fas fa-folder',
      submenu: [
        {
          titulo: 'Usuarios',
          url: 'users',
        },
        {
          titulo: 'Hospitales',
          url: 'hospitales',
        },
        {
          titulo: 'Medicos',
          url: 'medicos',
        },
      ],
    },
  ];

  constructor() {}
}
