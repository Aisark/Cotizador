import { Component, OnInit } from '@angular/core';
import { ProductoService } from '@services/producto/producto.service';
import {Producto} from '../../interfaces/Producto';
@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss']
})
export class PaquetesComponent implements OnInit {

  loading = true;

  segmentacion = {
    jabon: [],
    desodorante: [],
    mascarilla: [],
    bifase: [],
    aceite: [],
    shampoo: [],
    crema: [],
    tonico: [],
    alimento: []

  };

  productos = [];

  paquete = [];

  seleccionado: number;

  constructor(private _productoService: ProductoService) {
      this._productoService.getAllProductos().subscribe(
        (datos) => {
          this.productos = datos;
          for (let producto in this.productos) {
            let tipo = this.productos[producto].tipo;
            this.segmentacion[tipo].push(this.productos[producto]);
          }
          this.loading = false;

        }
      )
   }

   cambiar(producto: Producto) {
      this.paquete.push(producto[0]);
      console.log(this.paquete);
   }


  ngOnInit() {
    
  }

}
