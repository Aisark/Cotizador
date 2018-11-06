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

  clase = 'none';

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

  nombresProductos = [];


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

   public cambiar(producto: Producto[]) {
      this.paquete.push(producto[producto.length-1]);
   }

   public siguiente() {
     for (let i = this.paquete.length-1 ; i >= 0; i--) {
       this.nombresProductos.push(this.paquete[i].name);
     }
     this.clase = 'activado';
   }

   public cerrarModal(clase: string) {
     this.clase = clase;
     this.nombresProductos = [];
   }


  ngOnInit() {
    
  }

}
