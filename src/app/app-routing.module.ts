import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { MainPagesRoutingModule } from './pages/main-pages.routing';

export const routes: Routes = [
  // path: 'dashboard => MainPagesRoutingModule'
  // path: 'auth => AuthRoutingModule'
  // path: 'medicos => MedicosRoutingModule'
  // path: 'compras => comprasRoutingModule'

  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    MainPagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
