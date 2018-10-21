import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { CotizacionService } from '@services/cotizacion/cotizacion.service';

// Models
import { Cliente, Cotizacion } from '@models/models.index';

// Enums
import { TipoCliente } from 'app/enums/tipo-cliente.enum';

// Otras
import swal from 'sweetalert2';


@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
})
export class CotizadorComponent implements OnInit {
  private local = false;
  private cliente: Cliente;
  private date = new Date;
  private TipoCliente = TipoCliente;
  private tipo_precio = this.TipoCliente.PUBLICO;
  private cotizacion: Cotizacion;

  constructor(
    private _router: Router,
    private _acrouter: ActivatedRoute,
    private _cotizadorServices: CotizacionService
  ) {
    this._acrouter.params.subscribe( params => {

      let id = params['id'];
      let numero = params['numero'];

      this.getCotizacion(id, numero);      
    });
   }

  ngOnInit() {
  }

  public getCotizacion (id: string, numero: number) {
    this._cotizadorServices.getCotizacion(id, numero)
      .subscribe( 
        (res: any) => {
        this.cotizacion = res.Item;
        this.cliente = this.cotizacion.cliente;
        this.tipo_precio = this.cliente.tipo_cliente;
        },
        (err) => console.log(err)
      );
  }


  public sendCotizacion (cotizacion: Cotizacion) {

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
    this._cotizadorServices.updateCotizacion(this.cotizacion)
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
