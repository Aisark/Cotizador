import { Component, OnInit } from '@angular/core';
import { Producto } from '@models/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: Producto [] = [{
    tipo: 'jabon', name: 'hola'}];
  valorBusqueda: string;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  cambioBusqueda(busqueda: string) {
      this.valorBusqueda = busqueda;
  }

  editar(index: number) {
    this.router.navigate(['/productos', index]);
  }

}
