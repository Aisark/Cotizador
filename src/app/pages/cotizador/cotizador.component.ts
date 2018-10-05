import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

// Services
import { TipoProductoService } from '@services/tipo-producto/tipo-producto.service';
import { CotizacionService } from '@services/cotizacion/cotizacion.service';

// Models
import { DatosCliente, Cliente, Cotizacion } from '@models/models.index';

// Enums
import { TipoCliente } from 'app/enums/tipo-cliente.enum';

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
  private date = new Date;
  private TipoCliente = TipoCliente;
  private tipo_precio = this.TipoCliente.PUBLICO;
  private cotizacion: Cotizacion;
  private datosClientes: DatosCliente;

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
      } else {
        this.setCotizacion(id, 0);
      }

      
    });
   }


  public setCotizacion (id: string, numero: number) {
    this.cotizacion = {
      id: (id === 'nuevo') ? `${this.date.getDate()}-${this.date.getMonth() + 1}-${this.date.getFullYear()}` : id,
      numero: (id === 'nuevo') ? 0 : numero,
    };
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


  public setDatosClientes () {
    let datosCliente: DatosCliente = {
       correo: this.cliente.correo,
       estado: this.cliente.estado,
       telefono: this.cliente.telefono,
       nombre: this.cliente.nombre,
       local: this.cliente.local,
       tipo_cliente: this.tipo_precio
    };

    if (!this.cliente.local) {
      datosCliente.direccion = this.cliente.direccion;
      datosCliente.codigo_postal = this.cliente.codigo_postal;
      datosCliente.colonia = this.cliente.colonia;
      datosCliente.referencia = this.cliente.referencia;
      datosCliente.ciudad = this.cliente.ciudad;
    }

    this.datosClientes = datosCliente;

  }

  public sendCotizacion (cotizacion: Cotizacion) {

    this.setDatosClientes();

    this.cotizacion.cliente = this.datosClientes;
    
    swal({
      title: 'Desea guardar la cotización?',
      text: 'La catización puede ser modificada despues',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardarlo!'
    })
    .then( (res: any) => {
      if (res.value) {
        this.saveCotizacion();
      }
    });
  }

  public saveCotizacion () {
    this._cotizadorServices.createCotizacion(this.cotizacion)
      .subscribe(
        (res) => {
          swal(
            'Guardado!',
            'La cotización se guardo exitosamente',
            'success'
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
