import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

// Services
import { TipoProductoService } from '@services/tipo-producto/tipo-producto.service';
import { ClienteService } from '@services/cliente/cliente.service';

// Models
import { Cliente } from '@models/cliente';

// Otras
import swal from 'sweetalert2';


@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html'
})
export class CotizadorComponent implements OnInit {

  private nuevo = false;
  private local = false;
  private cliente: Cliente;

  // @ViewChild('localInput') localInput: ElementRef;

  constructor(
    private _router: Router,
    private _acrouter: ActivatedRoute,
    private _clienteServices: ClienteService
  ) {
   }

  ngOnInit() {
  }


}
