import { Injectable } from '@angular/core';
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

  constructor(
    private http: HttpClient
  ) { }

  /**
   * @description Guarda un Objeto Cotizacion en la BD de AWS
   * @param cotizacion Objeto de tipo Cotizacion, que sera guardada en la BD de AWS
   */
  createCotizacion (cotizacion: Cotizacion) {
    const url = `${URL_SERVICES}/cotizacion/new`;

    return this.http.post(url, cotizacion);
  }

  getCotizaciones (page?: any) {

    let url = `${URL_SERVICES}/cotizacion`;

    if (page !== undefined && page !== null) {
      url = `${url}?id=${page.id}&numero=${page.numero}`;
    }

    return this.http.get(url);
  }

  updateCotizacion (cotizacion: Cotizacion) {}

  deleteCotizacion ( cotizacion: Cotizacion ) {}

}
