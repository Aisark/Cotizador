import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// URL para AWS API Gateway
import { URL_SERVICES } from '@config/config';

// Modelos
import { Cotizacion, ItemLista, Producto, Usuario, Cliente } from '@models/models.index';


@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  public cliente: Cliente;

  constructor(
    private http: HttpClient
  ) { }

  createCotizacion (cotizacion: Cotizacion) {
    return new Promise( (resolve) => {
      resolve('Cotizacion creada exitosamente');
    });
  }

  getCotizaciones (page?: any) {

    let url = `${URL_SERVICES}/cotizacion`;

    if (page !== undefined) {
      url = `${url}?id=${page.id}`;
    }

    return this.http.get(url);
  }

  updateCotizacion (cotizacion: Cotizacion) {}

  deleteCotizacion ( cotizacion: Cotizacion ) {}

}
