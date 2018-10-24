import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// URL para AWS API Gateway
import { URL_SERVICES, URL_PRUEBA } from '@config/config';

// Modelos
import { Cliente } from '@models/models.index';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private cliente: Cliente;

  constructor(
    private http: HttpClient
  ) { }


  createCliente (cliente: Cliente) {
    this.cliente = cliente;

    const url = `${URL_SERVICES}/clientes/new`;

    return this.http.post(url, cliente);
  }

  getListClientes (page?: any) {
    let url = `${URL_SERVICES}/clientes`;

    url = (!page) ? url : `${url}?correo=${page.correo}&estado=${page.esado}`;

    console.log(url);

    return this.http.get(url);
  }

  public getCliente(correo: string) {
    let url = `${URL_PRUEBA}/clientes/${correo}`;
    
    return this.http.post(url, {email : correo})
        .pipe(
          map(
            (datos: any) => datos.Items[0]
          )
        );
  }
}
