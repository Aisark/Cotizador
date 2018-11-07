import { Component, OnInit, Input } from '@angular/core';

import Swal from 'sweetalert2';

// Services
import { ModalSearchService } from '@components/modal-search/modal-search.service';
import { ProductoService } from '@services/producto/producto.service';

// Class
import { Tipo, AddListProducts, Producto } from '@models/models.index';

// Enums
import { TipoCliente } from 'app/enums/tipo-cliente.enum';

@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.component.html',
  styleUrls: ['./modal-search.component.css']
})
export class ModalSearchComponent implements OnInit {

  private tipos: Tipo[];
  private addListProducts: AddListProducts[] = [];
  private tipoCliente = TipoCliente;
  @Input('tipo_precio') tipo_precio = TipoCliente.PUBLICO;

  constructor(
    private _modalSearch: ModalSearchService,
    private _productService: ProductoService
  ) { }

  ngOnInit() {
    this.getTiposProductos();
  }

  public showTipoCliente(value: any) {
    this.tipo_precio = +value + 1;
  }

  public hiddeModal () {
    this._modalSearch.hideModal();
  }

  public getTiposProductos () {
    this._productService.getTipoProductos()
      .then( (res) => this.tipos = res)
      .catch();
  }

  public selected (value: any) {
    if ( value !== '') {
      this.getProductsByTipe(value);
    }

  }

  public getProductsByTipe (tipo: string) {

    this.addListProducts = [];

    this._productService.getProductsByType(tipo, 'false')
      .subscribe(
        (res: any) => {
          res.Items.forEach(item => {
            this.addListProducts.push({
              isAdd: false,
              producto: item
            });
          });
        }
      );
  }

  public addProducts() {
    let productos: Producto[] = [];

    this.addListProducts.forEach( (item: any) => {
      if (item.isAdd) {
        productos.push(item.producto);
      }
    });

    this._modalSearch.newProductos.emit(productos);
    this._modalSearch.hideModal();
  }

}
