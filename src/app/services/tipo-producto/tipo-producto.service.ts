import { Injectable } from '@angular/core';

import { URL_SERVICES } from '@config/config';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  constructor(
    public http: HttpClient
  ) { }

  getTiposProductos() {
    const url = `${URL_SERVICES}/cotizacion/new`;
    return this.http.post(url, {})
      .pipe(
        map( (res: any) => res)
      );
  }

}
