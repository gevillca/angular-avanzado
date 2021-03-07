import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard..',
      icono: 'nav-icon fas fa-tachometer-alt',
      submenu: [
        {
          // <i class="fas fa-users-cog"></i>
          titulo: 'main',
          icono: 'nav-icon fas fa-users-cog',
          url: '/',
        },
        {
          // <i class="fas fa-tasks"></i>
          titulo: 'progress',
          icono: 'nav-icon fas fa-tasks',
          url: 'progress',
        },
        {
          titulo: 'graficas',
          // <i class="fas fa-chart-pie"></i>
          icono: 'nav-icon fas fa-chart-pie',
          url: 'grafica1',
        },
      ],
    },
    {
      titulo: 'Mantenimientos',
      icono: 'nav-icon fas fa-hammer',
      submenu: [
        {
          titulo: 'Usuarios',
          // <i class="fas fa-users"></i>
          icono: 'nav-icon fas fa-users',
          url: 'users',
        },
        {
          titulo: 'Hospitales',
          // <i class="far fa-hospital"></i>
          icono: 'nav-icon far fa-hospital',
          url: 'hospitales',
        },
        {
          titulo: 'Medicos',
          // <i class="fas fa-user-md"></i>
          icono: 'nav-icon fas fa-user-md',
          url: 'medicos',
        },
      ],
    },
  ];

  constructor() {}
}
