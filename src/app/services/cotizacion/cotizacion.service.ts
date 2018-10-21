import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// URL para AWS API Gateway
import { URL_SERVICES } from '@config/config';

// Modelos
import { Cotizacion, Cliente } from '@models/models.index';
import { TipoCliente } from '@enums/tipo-cliente.enum';
import { Router } from '@angular/router';

// Node
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private cliente: Cliente;
  public emitCliente = new EventEmitter<Cotizacion>();

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  /**
   * @description Guarda un Objeto Cotizacion en la BD de AWS
   * @param cotizacion Objeto de tipo Cotizacion, que sera guardada en la BD de AWS
   */
  public createCotizacion (cotizacion: Cotizacion, cliente?: Cliente) {

    this.cliente = cliente;

    cotizacion.cliente = this.cliente;

    const url = `${URL_SERVICES}/cotizacion/new`;

    return this.http.post(url, cotizacion);
  }

  public newCotizacion (cliente: Cliente) {
    const date = new Date;

    const cotizacion: Cotizacion = {
      id: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
      numero:  0,
      totalCompra: 0,
      lista_productos: [],
      status: 0
    };

    this.createCotizacion(cotizacion, cliente)
      .subscribe(
        (res: any) => {
          swal(
            'Guardado!',
            'La cotización se creo exitosamente',
            'success'
          ).then(
            () => this._router.navigate(['/cotizador', cotizacion.id, res.numero])
          );
        },
        err => {
          swal(
            'Error!',
            'Ha habido algún error al guardar la cotización',
            'error'
          );
        }
      );
  }

  public getCotizaciones (page?: any) {

    let url = `${URL_SERVICES}/cotizacion`;

    if (page !== undefined && page !== null) {
      url = `${url}?id=${page.id}&numero=${page.numero}`;
    }

    return this.http.get(url);
  }

  public getCotizacion (id: string, numero: number) {
    let url = `${URL_SERVICES}/cotizacion/${id}/${numero}`;
    return this.http.get(url);
  }

  public updateCotizacion (cotizacion: Cotizacion) {
    const url = `${URL_SERVICES}/cotizacion/${cotizacion.id}/${cotizacion.numero}`;

    return this.http.put(url, cotizacion);
  }

  /**
   * @description Borra una cotización atraves de sus clave compuesta
   * @param cotizacion Objeto de tipo Cotización
   */
  public deleteCotizacion ( cotizacion: Cotizacion ) {
    const url = `${URL_SERVICES}/cotizacion/${cotizacion.id}/${cotizacion.numero}`;

    return this.http.delete(url);
  }

  public getCotizacionesById (id: string, page?: any) {
    let url = `${URL_SERVICES}/cotizacion/${id}`;

    if (page !== undefined && page !== null) {
      url = `${url}?id=${page.id}&numero=${page.numero}`;
    }

    return this.http.get(url);
  }

  public updateListCotizacion (tipo: TipoCliente, index: number, cotizacion: Cotizacion) {
    const url = `${URL_SERVICES}/cotizacion/${cotizacion.id}/${cotizacion.numero}?tipo=${tipo}&index=${index}`;

    return this.http.put(url, cotizacion);
  }

  public calculeTotalCotizacion (body: any) {
    const url = `${URL_SERVICES}/cotizacion/calculate`;

    return this.http.post(url, body);
  }

}
