import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { EstatusPedidoPipe } from './estatus-pedido.pipe';
import { EstatusPedidoColorPipe } from './estatus-pedido-color.pipe';
import { RemoveSpacePipe } from './remove-space.pipe';
import { GetTypePrecioPipe } from './get-type-precio.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImagenPipe, EstatusPedidoPipe, EstatusPedidoColorPipe, RemoveSpacePipe, GetTypePrecioPipe],
  exports: [ImagenPipe, EstatusPedidoPipe, EstatusPedidoColorPipe, RemoveSpacePipe, GetTypePrecioPipe]
})
export class PipesModule { }
