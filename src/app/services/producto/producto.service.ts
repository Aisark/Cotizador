import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// URL
import { URL_SERVICES } from '@config/config';

// Models 
import { Producto, Tipo } from '@models/models.index';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private tipos: Tipo[];
 
  constructor(
    private http: HttpClient
  ) { }

  getTipoProductos (): Promise<Array<Tipo>> {

    const url = `${URL_SERVICES}/productos/tipos`;

    return new Promise( (resolve, reject) => {
      this.http.get(url)
      .subscribe(
        (res: any) => {
          this.tipos = res;
          resolve(this.tipos);  
        },

        (err) => {
          reject(err);
        }
      );
    });
    
  }

  getProductsByType (tipo: string) {
    const url = `${URL_SERVICES}/productos/${tipo}`;
    return this.http.get(url);
  }

}
