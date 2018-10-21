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
  page = 1;
  indexes:number[];


  constructor(private router: Router, private _productosServices: ProductoService) { 
  }

  ngOnInit() {
    this._productosServices.getProductosPaginados(true).subscribe(
      (productos: any) => {
        this.productos = productos;
        this.indexes = this._productosServices.getItemIndex();
      }
    );
    
  }

  public cambioBusqueda(busqueda: string) {
    this.valorBusqueda = busqueda;
    if (this.valorBusqueda.length < 1) {
      this.valorBusqueda = null;
      this._productosServices.getProductosPaginados(true).subscribe(
        (productos: any) => {
          this.productos = productos;
          this.indexes = this._productosServices.getItemIndex();
        }
      );
    }
      this._productosServices.searchProducto(busqueda)
          .subscribe(
            (data) => {
              this.productos = data;
            }
          )

  }

  public editar(name: string, tipo: string) {
    this.router.navigate(['/producto', tipo, name], {queryParams: {tipo: tipo}});
  }

  public siguiente() {

    this.getProductosPaginado(true);
    this._productosServices.siguiente();
    this.indexes = this._productosServices.getItemIndex();
  }

  public anterior() {

    this.getProductosPaginado(false);
    this._productosServices.anterior();
    this.indexes = this._productosServices.getItemIndex();
  }

  private getProductosPaginado(siguiente: boolean): void {
    this._productosServices.getProductosPaginados(siguiente)
      .subscribe(
        (productos: any) => {
          this.productos = productos;
          this.page = this._productosServices.page;
        }
      );
  }

  public getIndex(index: number){
      return this.indexes[index];
  }
}
