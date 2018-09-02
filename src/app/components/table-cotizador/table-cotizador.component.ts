import { Component, OnInit, ElementRef } from '@angular/core';

// Services
import { ModalSearchService } from '@components/modal-search/modal-search.service';

// Clases
import { Cotizacion, Itemlista } from '@models/cotizacion';
import {Producto} from '@models/producto';


@Component({
  selector: 'app-table-cotizador',
  templateUrl: './table-cotizador.component.html',
  styles: ['./table-cotizador.component.scss']
})
export class TableCotizadorComponent implements OnInit {

  productos: Producto[];

  cotizacion: Cotizacion;

  lista: Itemlista[];

  inputCantidad: ElementRef;

  enviogratis = false;

  constructor(
    public _modalSearch: ModalSearchService
  ) {
   }

  ngOnInit() {
  }

  public getTotal() {
    this.cotizacion.totalCompra = 0;
    if ( this.lista.length > 0 ) {
      this.lista.forEach( (element: Itemlista) => {
        this.cotizacion.totalCompra += ( element.cantidad * element.producto.precio['publico']);
      });

      if ( this.cotizacion.totalCompra <= 1000 && this.cotizacion.totalCompra > 0) {
        this.cotizacion.totalCompra += 150;
        this.enviogratis = false;
      } else if ( this.cotizacion.totalCompra > 1000 && this.cotizacion.totalCompra > 0) {
        this.enviogratis = true;
      }
    }
  }

  public changeItemCantidad(producto: Itemlista, valor: number) {

    if (valor === 1 || valor === -1) {
      if ( (producto.cantidad + valor ) >= 0 ) {
        console.log(valor);
        producto.cantidad += valor;
        this.getTotal();
      }
    } else if (valor >= 0) {
      producto.cantidad = valor;
        this.getTotal();
    } else if (valor < -2 ) {
      this.inputCantidad.nativeElement.value = producto.cantidad;
    }

  }

  public removeItem(item: Itemlista) {
    console.log(this.lista.indexOf(item));

    const pocision = this.lista.indexOf(item);

    this.lista.splice(pocision, 1);

    this.getTotal();
  }

  public addItem() {
    this.lista.push(new Itemlista(
      1,
      this.productos[1]
    ));

    this.getTotal();
  }

  public change(producto: Itemlista, event: KeyboardEvent) {
    if ((<HTMLInputElement>event.target).value !== undefined && (<HTMLInputElement>event.target).value !== '') {
      const numero = (<HTMLInputElement>event.target).value;
      producto.cantidad = ( +numero >= 0) ? +numero : producto.cantidad;
    } else {
      console.log('preparandose');
      setTimeout( ()  => {
        if ( +(<HTMLInputElement>event.target).value <= 0
            || (<HTMLInputElement>event.target).value === undefined
            || (<HTMLInputElement>event.target).value === '') {

          (<HTMLInputElement>event.target).value = producto.cantidad.toString();
          console.log('ejecucion correcta');
        }
      }, 3000);
    }
  }

  public showModal () {
    this._modalSearch.showModal();
  }
}
