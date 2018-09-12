import { Component, OnInit } from '@angular/core';

import { Cliente } from '@models/models.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '@services/cliente/cliente.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

  private nuevo = false;
  private local = false;
  private cliente: Cliente;

  // @ViewChild('localInput') localInput: ElementRef;

  constructor(
    private _router: Router,
    private _acrouter: ActivatedRoute,
    private _clienteServices: ClienteService
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
  }

  createCliente (form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.cliente = form.value;

    this._clienteServices.createCliente(this.cliente)
      .subscribe(
        (data: any) => {
          swal({
            type: 'success',
            title: `Se ha agregado existosamente`,
            text: `${this.cliente.nombre}`
          }).then( (result: any) => {
            this._router.navigate(['/cotizaciones']);
          });
        },
        error => {
          swal({
            type: 'error',
            title: 'Oops...',
            text: error.error,
          });
        }
      );
  }

  updateCliente (form: NgForm) {}

  submit (form: NgForm) {
    if (this.nuevo) {
      this.createCliente(form);
    } else {

    }
  }

}
