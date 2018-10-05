import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
// URL
import { URL_SERVICES } from '@config/config';

// URL DE PRUEBAS JHZ

import {URL_PRUEBA} from '@config/config';


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

  getProductsByType (tipo: string, comple?: string) {
    let url = `${URL_SERVICES}/productos/${tipo}`;
    if (comple) {
      url = `${url}?c=false`;
    }
    return this.http.get(url);
  }
  // ARRAY DE TODOS LOS PRODUCTOS 
  getAllProductos() {
    let url = `${URL_PRUEBA}/productos`;
    return this.http.get(url)
            .pipe(
              map(
                (productos: any) => {
                  return productos.Items;
                }
              )
            );
  }
  // Informacion de un solo producto
  getProductoByName(name: string) {
    let url = `${URL_PRUEBA}/producto/${name}`;
    return this.http.get(url)
            .pipe(
              map(
                (producto: any) => {
                  return producto;
                }
              )
            );
  }

}
