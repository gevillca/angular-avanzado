import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { MainPagesModule } from './pages/main-pages.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, NopagefoundComponent],
  imports: [BrowserModule, AppRoutingModule, MainPagesModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
