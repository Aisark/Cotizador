import { Component, OnInit } from '@angular/core';
import { Producto } from '@models/producto';
import { Router } from '@angular/router';
import { ProductoService } from '@services/producto/producto.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: Producto [] = [];
  valorBusqueda: string;

  constructor(private router: Router, private _productosServices: ProductoService) { }

  ngOnInit() {
    this._productosServices.getAllProductos().subscribe(
      (productos: any) => {
        this.productos = productos;
      }
    );
  }

  cambioBusqueda(busqueda: string) {
      this.valorBusqueda = busqueda;

  }

  editar(name: string, tipo: string) {
    this.router.navigate(['/producto', tipo, name], {queryParams: {tipo: tipo}});
  }

  

}
