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

    const date = new Date;

    const cotizacion: Cotizacion = {
      id: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
      numero:  0,
      totalCompra: 0,
      lista_productos: [],
      status: 0
    };

    this._cotizacionServices.createCotizacion(cotizacion, cliente)
      .subscribe(
        (res: any) => {
          swal(
            'Guardado!',
            'La cotización se guardo exitosamente',
            'success'
          ).then(
            () => this._router.navigate(['/cotizador', cotizacion.id, res.numero])
          );
        },
        err => {
          swal(
            'Error!',
            'Ha habido algún error al guardar la cotización',
            'error'
          );
        }
      );
  }
}
