import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// URL para AWS API Gateway
import { URL_SERVICES } from '@config/config';

// Modelos
import { Cliente } from '@models/models.index';

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

    return this.http.get(url);
  }
}
