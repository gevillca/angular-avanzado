import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';
import { ImageModalComponent } from './image-modal/image-modal.component';

@NgModule({
  declarations: [IncrementadorComponent, DonaComponent, ImageModalComponent],
  exports: [IncrementadorComponent, DonaComponent, ImageModalComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
})
export class ComponentsModule {}
