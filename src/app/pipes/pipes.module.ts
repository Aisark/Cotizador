import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { EstatusPedidoPipe } from './estatus-pedido.pipe';
import { EstatusPedidoColorPipe } from './estatus-pedido-color.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImagenPipe, EstatusPedidoPipe, EstatusPedidoColorPipe],
  exports: [ImagenPipe, EstatusPedidoPipe, EstatusPedidoColorPipe]
})
export class PipesModule { }
