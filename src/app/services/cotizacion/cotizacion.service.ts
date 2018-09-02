import { Injectable } from '@angular/core';

// Modelos
import { Cotizacion } from '@models/cotizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  constructor() { }

  createCotizacion (cotizacion: Cotizacion) {
    return new Promise( (resolve) => {
      resolve('Cotizacion creada exitosamente');
    });
  }

  readCotizacion (id: string): Promise<Cotizacion> {
    return new Promise( (resolve)  => {
      const cotizacion = {
        id: '#01',
        nombreCliente: 'Paty',
        cliente: null,
        fecha: '20/10/2018',
        lista_productos: [],
        totalCompra: 0
      };
      resolve(cotizacion);
    });
  }

  updateCotizacion (cotizacion: Cotizacion) {}

  deleteCotizacion ( cotizacion: Cotizacion ) {}

}
