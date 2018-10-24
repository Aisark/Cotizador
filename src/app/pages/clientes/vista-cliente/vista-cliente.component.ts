import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ClienteService } from '@services/cliente/cliente.service';
import {Cliente} from '../../../interfaces/Clientes';
import {Location} from '@angular/common';
@Component({
  selector: 'app-vista-cliente',
  templateUrl: './vista-cliente.component.html',
  styleUrls: ['./vista-cliente.component.scss']
})
export class VistaClienteComponent implements OnInit {

  cliente: Cliente;
  loading = true;
  opciones = [true, false];
  
  
  constructor(private _activatedRoute: ActivatedRoute, public _clienteService: ClienteService , private _location: Location) {
    this._activatedRoute.params.subscribe(
      (params) => {
          let correo = params['id'];
          this._clienteService.getCliente(correo).subscribe(
            (cliente) => {
                this.cliente = cliente;
                this.loading = false;
            }
          );
      }
    );
   }


  ngOnInit() {
  }

  public editar() {
    this._clienteService.updateCliente(this.cliente.correo, this.cliente)
        .subscribe();
  }

  public volver() {
    this._location.back();
  }

}
