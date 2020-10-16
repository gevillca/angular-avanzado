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
  ];

  constructor() {}
}