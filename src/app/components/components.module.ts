import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { DatosModalComponent } from './datos-modal/datos-modal.component';
import { PipesModule } from '../pipes/pipes.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ImageModalComponent,
    DatosModalComponent,
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ImageModalComponent,
    DatosModalComponent,
  ],
  imports: [CommonModule, FormsModule, ChartsModule, PipesModule, QRCodeModule],
})
export class ComponentsModule {}
