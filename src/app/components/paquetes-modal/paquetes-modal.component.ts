import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductoService } from '@services/producto/producto.service';

@Component({
  selector: 'app-paquetes-modal',
  templateUrl: './paquetes-modal.component.html',
  styleUrls: ['./paquetes-modal.component.scss']
})
export class PaquetesModalComponent implements OnInit {

  @Input() clase: string;
  @Input() nombresProductos;
  @Input() paquete;
  @Output() cerrado: EventEmitter<string> = new EventEmitter(); 

  precio: number;

  fecha: Date;

  nuevoPaquete = {
    name: null,
    tipo: 'paquete',
    precio: {
      distribuidor_ocasional: null ,
      distribuidor_preferencial: null,
      publico: null
    },
    productos:null,
    fecha:null
  };


  constructor(private _servicioProducto:ProductoService) { 
    this.fecha = new Date();
  }

  ngOnInit() {
  }

  public cerrarModal() {
    this.cerrado.emit('none');
  }

  public guardar(forma) {
    let nombre: string = forma.value.nombre;
    let auxiliar = nombre.slice(1,nombre.length);
    nombre = nombre.toUpperCase().slice(0,1);
    nombre = nombre.concat(auxiliar);
    this.nuevoPaquete.name = nombre;
    this.nuevoPaquete.precio.distribuidor_ocasional = forma.value.distribuidor;
    this.nuevoPaquete.precio.distribuidor_preferencial = forma.value.preferencial;
    this.nuevoPaquete.precio.publico = forma.value.public;
    this.nuevoPaquete.productos = this.paquete;
    this.nuevoPaquete.fecha = this.fecha;
    this._servicioProducto.postProducto(this.nuevoPaquete).subscribe();
    this.cerrarModal();
  }

}
