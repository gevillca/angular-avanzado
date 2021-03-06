import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { MainPagesComponent } from './main-pages.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    MainPagesComponent,
  ],
  exports: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    MainPagesComponent,
  ],

  imports: [CommonModule, SharedModule, RouterModule],
})
export class MainPagesModule {}
