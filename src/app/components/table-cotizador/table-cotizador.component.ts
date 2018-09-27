import { Component, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';

// Services
import { ModalSearchService } from '@components/modal-search/modal-search.service';

// Clases
import { Cotizacion, ItemLista } from '@models/models.index';
import {Producto} from '@models/producto';

// Enums
import { TipoCliente } from 'app/enums/tipo-cliente.enum';
import { EstatusCotizacion } from 'app/enums/estatus-cotizacion.enum';

@Component({
  selector: 'app-table-cotizador',
  templateUrl: './table-cotizador.component.html',
  styleUrls: ['./table-cotizador.component.scss']
})
export class TableCotizadorComponent implements OnInit {

  private cotizacion: Cotizacion;
  private lista: ItemLista[] = [];
  private inputCantidad: ElementRef;
  enviogratis = false;
  private TipoCliente = TipoCliente;
  private tipo_precio: TipoCliente;
  private subtotal = 0;

  // Variables de entrada
  @Input('tipo_precio') set _tipo_precio (value: TipoCliente) {
    this.tipo_precio = value;
    this.getTotal();
  }

  @Input('cotizacionSet') set cotizacionSet (value: Cotizacion) {
    this.cotizacion = value;
  }

  // Variables de salida
  // tslint:disable-next-line:no-output-rename
  @Output('cotizacionSend') contizacion_emit: EventEmitter<Cotizacion> = new EventEmitter();

  constructor(
    public _modalSearch: ModalSearchService
  ) {
    this.cotizacion = {
      id: 'usuario',
      numero: 0,
      lista_productos: this.lista,
      totalCompra: 0
    };
   }

  ngOnInit() {

    this.addProductos();

  }

  /**
   * @description Función que se subscribe al evento productos del servicio
   * "_modalSearch", itera sobre cada producto para verificar que no se encuentre
   * en el arreglo "lista"
   */
  public addProductos() {
    let verify = false;

    this._modalSearch.newProductos.subscribe(
      (productos: Array<Producto>) => {
        productos.forEach ( producto => {

          this.lista.forEach( (res: ItemLista) => {
            if (res.producto === producto) {
              verify = true;
            }
          });
          
          if (!verify) {
            this.lista.push({
              cantidad: 1,
              producto
            });
          } else {
            verify = false;
          }
        });

        this.getTotal();
      }
    );
  }

  public getTotal() {
    this.cotizacion.totalCompra = 0;
    if ( this.lista.length > 0 ) {
      this.lista.forEach( (element: ItemLista) => {
        let tp = 'publico';

        switch (this.tipo_precio) {
          case TipoCliente.PUBLICO:
            tp = 'publico';
            break;
          case TipoCliente.DISTRIBUIDOR_OCASIONAL:
            tp = 'distribuidor_ocasional';
            break;
          case TipoCliente.DISTRIBUIDOR_PREFERENCIAL:
            tp = 'distribuidor_preferencial';
            break;  
        }
        this.cotizacion.totalCompra += ( element.cantidad * element.producto.precio[tp]);
      });

      this.subtotal = this.cotizacion.totalCompra;

      if ( this.cotizacion.totalCompra <= 1000 && this.cotizacion.totalCompra > 0) {
        this.cotizacion.totalCompra += 150;
        this.enviogratis = false;
      } else if ( this.cotizacion.totalCompra > 1000 && this.cotizacion.totalCompra > 0) {
        this.enviogratis = true;
      }
    }
  }

  public changeItemCantidad(producto: ItemLista, valor: number) {

    if (valor === 1 || valor === -1) {
      if ( (producto.cantidad + valor ) >= 0 ) {
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

  public removeItem(item: ItemLista) {

    const pocision = this.lista.indexOf(item);

    this.lista.splice(pocision, 1);

    this.getTotal();
  }

  public change(producto: ItemLista, event: KeyboardEvent) {
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

  /**
   * @description Emite un objeto Cotizacion para ser guardado
   */
  public saveCotizacion () {
    this.cotizacion.lista_productos = this.lista;
    this.cotizacion.envio_gratis = this.enviogratis;
    this.cotizacion.status = EstatusCotizacion.Pendiente;

    this.contizacion_emit.emit(this.cotizacion);

  }

  public showModal () {
    this._modalSearch.showModal();
  }
}
