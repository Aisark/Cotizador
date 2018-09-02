import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { CotizadorComponent } from './cotizador/cotizador.component';
import { TableCotizadorComponent } from '@components/table-cotizador/table-cotizador.component';
import { ModalSearchComponent } from '../components/modal-search/modal-search.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CotizadorComponent,
    TableCotizadorComponent,
    ModalSearchComponent
  ],
  exports: [CotizadorComponent]
})
export class PagesModule { }
