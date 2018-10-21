import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

// Services
import { TipoProductoService } from '@services/tipo-producto/tipo-producto.service';
import { CotizacionService } from '@services/cotizacion/cotizacion.service';
import { PdfGeneratorService } from '@services/pdf-generator/pdf-generator.service';

// Models
import { DatosCliente, Cliente, Cotizacion } from '@models/models.index';

// Enums
import { TipoCliente } from 'app/enums/tipo-cliente.enum';

// Pipes
import { RemoveSpacePipe } from '@pipes/remove-space.pipe';

// Otras
import swal from 'sweetalert2';


@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  providers: [ RemoveSpacePipe ]
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
  private isPrinting = false;

  // @ViewChild('localInput') localInput: ElementRef;

  constructor(
    private _router: Router,
    private _acrouter: ActivatedRoute,
    private _cotizadorServices: CotizacionService,
    private _pdfGenerator: PdfGeneratorService
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
        this.tipo_precio = (this.cliente.tipo_cliente) ? this.cliente.tipo_cliente : this.tipo_precio;
        },
        (err) => console.log(err)
      );
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
        if (this.nuevo) {
          this.saveCotizacion();
        } else {
          this.updateCotizacion(this.cotizacion.id, this.cotizacion.numero);
        }
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
          ).then(
            () => this._router.navigate(['/cotizaciones'])
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


  public updateCotizacion (id: string, numero: number) {
    this._cotizadorServices.updateCotizacion(this.cotizacion)
      .subscribe(
        (res) => {
          swal(
            'Actualizado!',
            'La cotización se a actualizado exitosamente',
            'success'
          ).then(
            () => this._router.navigate(['/cotizaciones'])
          );
        },
        err => {
          swal(
            'Error!',
            'Ha habido algún error al actualizar la cotización',
            'error'
          );
        }
      );
  }
}
