import { Component, OnInit } from '@angular/core';
import { ProductoService } from '@services/producto/producto.service';

@Component({
  selector: 'app-menu-paquetes',
  templateUrl: './menu-paquetes.component.html',
  styleUrls: ['./menu-paquetes.component.scss']
})
export class MenuPaquetesComponent implements OnInit {

  constructor(private _servicioProductos: ProductoService) { }

  paquetes: any;

  loading = true;

  ngOnInit() {
      this._servicioProductos.getProductsByType('paquete')
          .subscribe(
            (datos: any) => {
              this.paquetes = datos.Items;
              this.loading = false;
            }
          )   
  }

}
