import { Component, OnInit } from '@angular/core';
import { Producto } from '@models/producto';
import { Router } from '@angular/router';
import { ProductoService } from '@services/producto/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: Producto [] = [{
    tipo: 'jabon', name: 'hola sd'}];
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

  editar(name: string) {
    this.router.navigate(['/producto', name]);
  }

}
