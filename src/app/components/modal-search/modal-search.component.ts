import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

// Services
import { ModalSearchService } from '@components/modal-search/modal-search.service';

// Class
import { Producto } from '@models/producto';
import { Tipo } from '@models/tipo';


@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.component.html',
  styles: []
})
export class ModalSearchComponent implements OnInit {

  private tipos: Tipo[] = [
    new Tipo('jabón', 6),
    new Tipo('shampoo', 4),
    new Tipo('tónico', 9)
  ];

  constructor(
    public _modalSearch: ModalSearchService
  ) { }

  ngOnInit() {
  }

  public hiddeModal () {
    this._modalSearch.hideModal();
  }

}
