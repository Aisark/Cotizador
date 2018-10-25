import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '@config/config';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor(
    private http: HttpClient
  ) { }

  public printPdf(body: any) {
    const url = `${URL_SERVICES}/pdf/cotizacion`;
    console.log(JSON.stringify(body));
    // return this.http.post(url, body);
  }
}
