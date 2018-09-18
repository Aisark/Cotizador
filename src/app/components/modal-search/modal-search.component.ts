import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

// Services
import { ModalSearchService } from '@components/modal-search/modal-search.service';
import { ProductoService } from '@services/producto/producto.service';

// Class
import { Tipo, AddListProducts } from '@models/models.index';


@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.component.html'
})
export class ModalSearchComponent implements OnInit {

  private tipos: Tipo[];
  private addListProducts: AddListProducts[];

  constructor(
    private _modalSearch: ModalSearchService,
    private _productService: ProductoService
  ) { }

  ngOnInit() {
    this.getTiposProductos();
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
    this._productService.getProductsByType(tipo)
      .subscribe(
        (res: any) => console.log(res)
      );
  }

}
