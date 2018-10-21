import { Component, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';

// Services
import { ModalSearchService } from '@components/modal-search/modal-search.service';

// Clases
import { Cotizacion } from '@models/models.index';
import {Producto} from '@models/producto';

// Enums
import { TipoCliente } from 'app/enums/tipo-cliente.enum';
import { EstatusCotizacion } from 'app/enums/estatus-cotizacion.enum';
import { CotizacionService } from '@services/cotizacion/cotizacion.service';
import { ItemCotizacion } from 'app/interfaces/item-cotizacion';

@Component({
  selector: 'app-table-cotizador',
  templateUrl: './table-cotizador.component.html',
  styleUrls: ['./table-cotizador.component.scss']
})
export class TableCotizadorComponent implements OnInit {
  // tslint:disable:no-input-rename no-output-rename
  private TipoCliente = TipoCliente;
  private subtotal = 0;
  private updateList = false;
  private cotizacion: Cotizacion;
  private tipo_precio: TipoCliente;

  // Variables de entrada
  @Input('nuevoTable') nuevo = false;
  @Input('tipo_precio') set _tipo_precio( val: TipoCliente) {
    this.tipo_precio = val;
    if (this.cotizacion) {
      const body = {
        lista: this.cotizacion.lista_productos,
        tipo: this.tipo_precio,
        costo_envio: 150
      };
      this.calculate(body);
    }
    
  }
  @Input('cotizacion') set _cotizacion(value: Cotizacion) {
    if (value) {
      this.cotizacion = value;
      this.recalculate();
    }
  }

  // Variables de salida
  @Output('cotizacionSend') cotizacion_emit: EventEmitter<Cotizacion> = new EventEmitter();

  constructor(
    public _modalSearch: ModalSearchService,
    private _cotizadorService: CotizacionService
  ) {
   }

  ngOnInit() {
  }

  /**
   * @description Función que se subscribe al evento productos del servicio
   * "_modalSearch", itera sobre cada producto para verificar que no se encuentre
   * en el arreglo "lista"
   */
  public addProductos() {
    let verify = false;
    
    const lista = this.cotizacion.lista_productos;
    this._modalSearch.newProductos.subscribe(
      (productos: Array<Producto>) => {
        productos.forEach ( producto => {

          lista.forEach( (res: ItemCotizacion) => {
            if (res.producto === producto) {
              verify = true;
            }
          });

          if (!verify) {
            lista.push({
              cantidad: 1,
              producto,
              importe: 0
            });
          } else {
            verify = false;
          }
        });

        const body = {
          lista: lista,
          tipo: this.tipo_precio,
          costo_envio: 150,
        };

        this.calculate(body);
        
      }
    );
  }

  public getTotal(input: any, item: ItemCotizacion) {
    if (+input.value <= 0) {
      input.value = item.cantidad;
    } else if (+input.value !== item.cantidad) {
      item.cantidad = +input.value;
      this.updateList = true;
      const index = this.cotizacion.lista_productos.indexOf(item);
      
      this.changeList(index);
    }
  }

  public removeItem (item: ItemCotizacion) {
    const index = this.cotizacion.lista_productos.indexOf(item) + 1;

    this.changeList(index * -1);
  }

  /**
   * @description Emite un objeto Cotizacion para ser guardado
   */
  public saveCotizacion () {
    this.cotizacion.status = EstatusCotizacion.Pendiente;

    this.cotizacion_emit.emit(this.cotizacion);

  }

  public showModal () {
    this._modalSearch.showModal();
  }

  public recalculate() {
    const body = {
      lista: this.cotizacion.lista_productos,
      tipo: this.cotizacion.cliente.tipo_cliente,
      costo_envio: 150,
    };
    this.calculate(body);
  }

  public calculate(body: any) {
    if (this.cotizacion.lista_productos.length > 0) {
      this.updateList = true;
      this._cotizadorService.calculeTotalCotizacion(body)
        .subscribe( (res: any) => {
          this.cotizacion.lista_productos = res.lista_productos;
          this.cotizacion.envio_gratis = res.enviogratis;
          this.subtotal = res.subtotal;
          this.cotizacion.totalCompra = res.total_compra;
          this.updateList = false;
        });
    }
    
  }

  public changeList (index: number) {
    const body = {
      lista: this.cotizacion.lista_productos,
      tipo: this.tipo_precio,
      costo_envio: 150,
      index
    };
    this.calculate(body);
  }
}
