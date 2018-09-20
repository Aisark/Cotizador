import { Injectable, EventEmitter } from '@angular/core';

// Services
import { ProductoService } from '@services/producto/producto.service';
import { Tipo, Producto } from '@models/models.index';

@Injectable({
  providedIn: 'root'
})
export class ModalSearchService {

  private classShow = 'hide';
  private tipos: Tipo[];
  public newProductos = new EventEmitter<Producto[]>();

  constructor(
    private _productoServices: ProductoService
  ) { }


  public hideModal () {
    this.classShow = 'hide';
  }

  public showModal () {
    this.classShow = '';
  }

}
