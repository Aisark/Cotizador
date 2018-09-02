import { Injectable } from '@angular/core';

import { Producto } from '@models/producto';
import { resolve } from 'path';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  getProductoByName(name: string): Promise<Producto> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve) => {

      const producto = {
        title: 'Jabón de mandarina',
        tipo: 'jabón',
        precio: {
          publico: 150,
          dOcasional: 125,
          dPreferencial: 100
        },
        isAviable: true
      };

      resolve(producto);
    });
  }

  getProductoByTipo(tipo: string): Promise<Producto> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise( (resolve)  => {

      const producto = {
        title: 'Jabón de mandarina',
        tipo: 'jabón',
        precio: {
          publico: 150,
          dOcasional: 125,
          dPreferencial: 100
        },
        isAviable: true
      };

      resolve(producto);
    });
  }

  createNewProducto (producto: Producto) {
  }

  updateProducto (producto: Producto) {
  }

  getListProductByTipo (tipo: string) {
  }

  searchProduct (termino: string) {
  }

}
