import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
// URL
import { URL_SERVICES, URL_PRUEBA } from '@config/config';

// URL DE PRUEBAS JHZ


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
  getProductoByName(name: string, tipo: string) {
    let url = `${URL_PRUEBA}/producto/${name}`;
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    let options = {
      headers: headers
    };
    return this.http.post(url, {nombre: name, tipo: tipo})
            .pipe(
              map(
                (producto: any) => {
                  return producto.Items[0];
                }
              )
            );
  }
  // Update de un producto

  updateProducto(producto: any) {
    let url = `${URL_PRUEBA}/producto/${[producto.nombre]}`;
    const headers =  new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    let options = {
      headers: headers
    };
    return this.http.put(url, producto, options)
              .pipe(
                map(
                  (updated) => updated
                )
              );
    
  }

  // Post de un producto

  postProducto(producto: any) {
    let url = `${URL_PRUEBA}/producto`;
    const headers =  new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    let options = {
      headers: headers
    };
    return this.http.post(url, producto, options)
          .pipe(
            map(
              (respuesta: any) => {
                console.log(respuesta);
              }
            )
          )
  }

}
