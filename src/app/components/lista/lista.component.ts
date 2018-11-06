import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Producto} from '../../interfaces/Producto';
import { ProductoService } from '@services/producto/producto.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  @Input() listName: string;
  @Output() changeElement: EventEmitter<Producto[]> = new EventEmitter();
  productos: Producto[];
  seleccionados: Producto[] = [];
  abierto = false;
  constructor(public _serviciosProductos: ProductoService) {
   }

  ngOnInit() {
    this._serviciosProductos.getProductsByType(this.listName)
    .subscribe(
      (datos:any) => this.productos = datos.Items
    )
  }

  changeSelection(producto: Producto , event) {
    event.srcElement.classList.add("active");
    if (this.seleccionados.includes(producto)) {
      return;
    }
    this.seleccionados.push(producto);
    this.changeElement.emit(this.seleccionados);
  }

  toggle(lista) {
    this.abierto = !this.abierto;
  }

}
