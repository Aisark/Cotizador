import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient} from '@angular/common/http';

// Services

// Models
import { Cotizacion, DatosCliente, ItemLista } from '@models/models.index';
import { TipoCliente } from '@enums/tipo-cliente.enum';
import { URL_SERVICES } from '@config/config';

// npm modules

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor(
    private http: HttpClient
  ) { }

  public getPDF (body) {
    const url = `${URL_SERVICES}/pdf/cotizacion`;

    return this.http.post(url, body);
  }
}
