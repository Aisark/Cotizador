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
  private previous: any[] = [];
  private lastEvaluatedKey : any;
  private aux;
  public page: number = 1;
  public tPages: number;
 
  constructor(
    private http: HttpClient
  ) {
    this.getAllProductos().subscribe(
      (data)=> {
        this.tPages = Math.floor(data.length / 10) + 1;
      }
    )
   }

  public getTipoProductos (): Promise<Array<Tipo>> {

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

  public getProductsByType (tipo: string, comple?: string) {
    let url = `${URL_SERVICES}/productos/${tipo}`;
    if (comple) {
      url = `${url}?c=false`;
    }
    return this.http.get(url);
  }
  // ARRAY DE TODOS LOS PRODUCTOS 
  public getAllProductos(page?: number) {
    let url = `${URL_PRUEBA}/productos`;
    return this.http.get(url, this.getHeaders())
            .pipe(
              map(
                (productos: any) => productos.Items
              )
            );
  }


  public getProductosPaginados(siguiente: boolean, first?:true) {

    let url = `${URL_PRUEBA}/productos`;
      //Si es la primera vez que se ejecuta la tabla
    if (!this.lastEvaluatedKey || first) {
      return this.http.post(`${url}/pages`,{},this.getHeaders())
      .pipe(
        map(
          (productos: any) => {
            this.lastEvaluatedKey = productos.LastEvaluatedKey; //se guarda el lastevaluateKey en el atributo de esta clase para ser usado posteriormente
            return productos.Items
          }
        )
      );
    } else {

        if (siguiente) { // Si se dió click al botón de siguiente entonces

           

           
            return this.http.post(`${url}/1`,{lastEvaluatedKey : this.lastEvaluatedKey},this.getHeaders())
            .pipe(
                map(
                 (productos: any) => {    
                   this.aux = this.lastEvaluatedKey; //se guarda en un auxiliar la ultima llave de la consulta previa
 
                   this.lastEvaluatedKey = productos.LastEvaluatedKey; // se cambia la llave a la de la nueva consulta
     
                   if(!this.previous[this.page-1]) {
                    this.previous.push(this.aux); // giardamos el auxiliar en un arreglo
                   }
                   
 
                 
 
                   return productos.Items
                 }
             )
           );
           }

         
         else { // En caso de que sea un retroceso de pagina ... --------------------------------------------------------
          if(this.page === 2) { // En caso de que sea la segunda pagina unicamente regresamos los primeros 10 objetos
            return this.http.post(`${url}/pages`,{},this.getHeaders())
              .pipe(
                map(
                  (productos: any) => {
                    this.lastEvaluatedKey = productos.LastEvaluatedKey;
                    return productos.Items
                  }
                )
              );
          }
          // De lo contrario esta en una pagina entre la segunda y la ultima por lo que se regresa a la llave de dos consultas previas
         
          return this.http.post(`${url}/pages`,{lastEvaluatedKey : this.previous[this.page - 3]},this.getHeaders())
          .pipe(
            map(
              (productos: any) => {
               this.lastEvaluatedKey = productos.LastEvaluatedKey;
                return productos.Items
              }
            )
          );
        }
     
    }
  }
  // Informacion de un solo producto
  public getProductoByName(name: string, tipo: string) {
    let url = `${URL_PRUEBA}/producto/${name}`;
   
    return this.http.post(url, {nombre: name, tipo: tipo}, this.getHeaders())
            .pipe(
              map(
                (respuesta: any) => respuesta.Items[0]
              )
            );
  }
  
  // Update de un producto
  public updateProducto(producto: any) {
 
    let url = `${URL_PRUEBA}/producto/${[producto.nombre]}`;
    
    return this.http.put(url, producto)
              .pipe(
                map(
                  (updated) => swal('Exito', 'Actualizacion completada', 'success')
                )
              );
    
  }

  // Post de un producto

  public postProducto(producto: any) {
    let url = `${URL_PRUEBA}/producto`;
    
    return this.http.post(url, producto, this.getHeaders())
          .pipe(
            map(
              (respuesta: any) =>  swal('Exito', 'Insercion completada', 'success')
            )
          );
  }

  // Delete de un producto

  public deleteProducto(name: string, tipo: string) {
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

  // Busqueda producto
  public searchProducto(name: string) {
    let url = `${URL_PRUEBA}/productos/search`;
    // use http request para mandar la info por el body
    return this.http.post(url, {nombre: name}, this.getHeaders())
    .pipe(
      map(
        (respuesta: any) => respuesta
      )
    );
  }


  public siguiente(){
    if (this.page + 1 > this.tPages ) {
      this.page = 1;
    } else {
      this.page += 1;
    }
  }

  public anterior(){
    if (this.page - 1 <= 0 ) {
      this.page = 1;
    } else {
      this.page -= 1;
    }

  }

  public getItemIndex(): number[]{
    let aux:number[] = [];
    if (this.page === 1){
      for(let i = 1; i <= 10; i++) {
        aux.push(i);
      }
      return aux;
    }

    let x = (this.page * 10) - 9;

    for(let i = x ; i <= x + 10 ; i++) {
      aux.push(i);
    }
    return aux;
  }

  // headers

  private getHeaders(): any {
    const headers =  new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    let options = {
      headers: headers
    };
    return options;
  }

}
