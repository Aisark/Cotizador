import { Component, OnInit } from '@angular/core';

// Services
import { ClienteService } from '@services/cliente/cliente.service';

// Models
import { Cliente } from '@models/models.index';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  private show = false;
  private clientes: Cliente[];


  constructor(
    private _clienteServices: ClienteService
  ) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes (page?: any) {
    this._clienteServices.getListClientes(page)
      .subscribe(
        (res: any) => {
          this.clientes = res.Items;
          console.log(this.clientes);
        }
      );
  }

}
