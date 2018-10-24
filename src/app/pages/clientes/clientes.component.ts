import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ClienteService } from '@services/cliente/cliente.service';
import { CotizacionService } from '@services/cotizacion/cotizacion.service';

// Models
import { Cliente, Cotizacion } from '@models/models.index';

// Otras
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  private show = false;
  private clientes: Cliente[];


  constructor(
    private _clienteServices: ClienteService,
    private _cotizacionServices: CotizacionService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes (page?: any) {
    this._clienteServices.getListClientes(page)
      .subscribe(
        (res: any) => {
          this.clientes = res.Items;
        }
      );
  }

  createCotizacion (cliente: Cliente) {
    this._cotizacionServices.newCotizacion(cliente);
  }

  public editar(correo) {
    this._router.navigate(['cliente', correo]);
  }
}
