import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpRequest} from '@angular/common/http';
import {map} from 'rxjs/operators';
// swal 
import swal from 'sweetalert2';
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
    return this.http.get(url, this.getHeaders())
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
   
    return this.http.post(url, {nombre: name, tipo: tipo}, this.getHeaders())
            .pipe(
              map(
                (respuesta: any) => respuesta.Items[0]
              )
            );
  }
  
  // Update de un producto
  updateProducto(producto: any) {
 
    let url = `${URL_PRUEBA}/producto/${[producto.nombre]}`;
    
    return this.http.put(url, producto)
              .pipe(
                map(
                  (updated) => swal('Exito', 'Actualizacion completada', 'success')
                )
              );
    
  }

  // Post de un producto

  postProducto(producto: any) {
    let url = `${URL_PRUEBA}/producto`;
    
    return this.http.post(url, producto, this.getHeaders())
          .pipe(
            map(
              (respuesta: any) =>  swal('Exito', 'Insercion completada', 'success')
            )
          );
  }

  // Delete de un producto

  deleteProducto(name: string, tipo: string) {
    let url = `${URL_PRUEBA}/producto/${[name]}`;
    // use http request para mandar la info por el body
    return this.http.request('delete', url, {
      headers: this.getHeaders(),
      body: {
        name,
        tipo
      }
    })
    .pipe(
      map(
        (data) => swal('Exito', 'Eliminacion completada', 'success')
      )
    );
  }

  // headers

  getHeaders(): any {
    const headers =  new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    let options = {
      headers: headers
    };
    return options;
  }

}
