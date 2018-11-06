import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  nuevoPaquete = {
    name: null,
    tipo: 'paquete',
    precio: {
      distribuidor_ocasional: null ,
      distribuidor_preferencial: null,
      publico: null
    },
    productos:null
  };


  constructor() { 
    console.log(this.nombresProductos);
  }

  ngOnInit() {
  }

  public cerrarModal(event) {
    this.cerrado.emit('none');
  }

  public guardar(forma) {
    this.nuevoPaquete.precio.distribuidor_ocasional = forma.value.distribuidor;
    this.nuevoPaquete.precio.distribuidor_preferencial = forma.value.preferencial;
    this.nuevoPaquete.precio.publico = forma.value.public;
    this.nuevoPaquete.productos = this.paquete;
    console.log(this.paquete);
  }

}
