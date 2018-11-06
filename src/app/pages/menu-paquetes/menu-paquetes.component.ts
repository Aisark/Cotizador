import { Component, OnInit } from '@angular/core';
import { ProductoService } from '@services/producto/producto.service';

@Component({
  selector: 'app-menu-paquetes',
  templateUrl: './menu-paquetes.component.html',
  styleUrls: ['./menu-paquetes.component.scss']
})
export class MenuPaquetesComponent implements OnInit {

  constructor(private _servicioProductos: ProductoService) { }

  ngOnInit() {
    
  }

}
