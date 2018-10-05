import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Componentes
import { CotizadorComponent } from './cotizador/cotizador.component';
import { TableCotizadorComponent } from '@components/table-cotizador/table-cotizador.component';
import { ModalSearchComponent } from '../components/modal-search/modal-search.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { PreloaderComponent } from '../components/preloader/preloader.component';
import { Page404Component } from './page404/page404.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PipesModule } from '@pipes/pipes.module';
import { ProductosComponent } from './productos/productos.component';
import { ShareModule } from '@share/share.module';
import { ProductoComponent } from './productos/producto/producto.component';

// Pipes

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipesModule,
    ShareModule
  ],
  declarations: [
    CotizadorComponent,
    TableCotizadorComponent,
    ModalSearchComponent,
    CotizacionesComponent,
    PreloaderComponent,
    Page404Component,
    ClientesComponent,
    ProductosComponent,
    ProductoComponent
  ],
  exports: [
    CotizadorComponent,
    CotizacionesComponent,
    Page404Component,
    ClientesComponent
  ]
})
export class PagesModule { }
