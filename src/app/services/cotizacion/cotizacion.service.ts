import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// URL para AWS API Gateway
import { URL_SERVICES } from '@config/config';

// Modelos
import { Cotizacion, Cliente } from '@models/models.index';


@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  public cliente: Cliente;
  public emitCliente = new EventEmitter<Cotizacion>();

  constructor(
    private http: HttpClient
  ) { }

  /**
   * @description Guarda un Objeto Cotizacion en la BD de AWS
   * @param cotizacion Objeto de tipo Cotizacion, que sera guardada en la BD de AWS
   */
  public createCotizacion (cotizacion: Cotizacion) {
    const url = `${URL_SERVICES}/cotizacion/new`;

    return this.http.post(url, cotizacion);
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

  public updateCotizacion (id: string, numero: number, cotizacion: Cotizacion) {
    const url = `${URL_SERVICES}/cotizacion/${id}/${numero}`;

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

}
