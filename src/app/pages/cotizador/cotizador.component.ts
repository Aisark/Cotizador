import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

// Services
import { TipoProductoService } from '@services/tipo-producto/tipo-producto.service';

// Models
import { Cliente } from '@models/cliente';

// Otras
import swal from 'sweetalert2';
import { CotizacionService } from '@services/cotizacion/cotizacion.service';


@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html'
})
export class CotizadorComponent implements OnInit {

  private nuevo = false;
  private local = false;
  private cliente: Cliente;
  private date = new Date;

  // @ViewChild('localInput') localInput: ElementRef;

  constructor(
    private _router: Router,
    private _acrouter: ActivatedRoute,
    private _cotizadorServices: CotizacionService
  ) {
    this._acrouter.params.subscribe( params => {

      let id = params['id'];
      id = (id === 'nuevo') ? id : Number(id);
      this.nuevo = id === 'nuevo';

      if (isNaN(id) && id !== 'nuevo') {
        this._router.navigate(['/page404']);
      }
    });
   }

  ngOnInit() {
    this.getCliente();
  }

  getCliente() {
    this.cliente = this._cotizadorServices.cliente;

    if (this.cliente === undefined) { 
      this._router.navigate(['/clientes']); 
    }
  }

}
