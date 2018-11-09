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

  vista = false;

  clase = 'none';

  nombresProductos = [];

  paquete = [];

  ngOnInit() {
      this._servicioProductos.getProductsByType('paquete')
          .subscribe(
            (datos: any) => {
              this.paquetes = datos.Items;
              this.loading = false;
            }
          );
  }

  public cerrarModal(clase: string) {
    this.clase = clase;
    this.nombresProductos = [];
  }

  public activar(i: number) {
    this.paquete = this.paquetes[i].productos;
    console.log(i);
    console.log(this.paquetes);
    console.log(this.paquetes[i]);
    console.log(this.paquete);
    for (let i = this.paquete.length - 1 ; i >= 0; i--) {
      this.nombresProductos.push(this.paquete[i].name);
    }
    console.log(this.nombresProductos);
    this.clase = 'activado';
  }

}
