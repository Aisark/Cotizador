import { ItemCotizacion } from 'app/interfaces/item-cotizacion';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { CotizacionService } from '@services/cotizacion/cotizacion.service';
import { GetTypeClientePipe } from '@pipes/get-type-cliente.pipe';
import { PdfGeneratorService } from '@services/pdf-generator/pdf-generator.service';

// Models
import { Cliente, Cotizacion } from '@models/models.index';

// Enums
import { TipoCliente } from 'app/enums/tipo-cliente.enum';

// Otras
import swal from 'sweetalert2';


@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  providers: [GetTypeClientePipe]
})
export class CotizadorComponent implements OnInit {
  local = false;
  cliente: Cliente;
  date = new Date;
  TipoCliente = TipoCliente;
  tipo_precio = this.TipoCliente.PUBLICO;
  cotizacion: Cotizacion;
  subtotal: number;
  load = false;

  constructor(
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

  public printDocument() {
    const getCliente = new GetTypeClientePipe();
    const envio_gratis = (this.cotizacion.envio_gratis) ? 'Envío gratis en compras mayores a $1,000' :
      (this.cotizacion.cliente.local) ? 'No aplica en entregas locales' : '$150';
    const body = {
      c: this.cotizacion,
      tipo_cliente: getCliente.transform(this.cotizacion.cliente.tipo_cliente),
      envio_gratis,
      subtotal: this.subtotal
    };
    this.recivePDF(body);
  }

  /**
   * @description
   * Recive el pdf del request y lo envía para descargar
   * @param body Objeto que contiene los datos que serán impresos
   */
  private recivePDF(body) {
    this.load = true;
    this._pdfGenerator.getPDF(body)
      .subscribe(
        (req: any) => {
          this.downloadPDF(req.htmlPdf);
        }
      );
  }

  private downloadPDF(pdf: string) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement('a');
    const fileName = `cotizacion ${this.cotizacion.cliente.nombre}.${this.cotizacion.id}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    this.load = false;
  }

  public Cotizacion(event: Array<ItemCotizacion>) {
    this.cotizacion.lista_productos = event;
  }

}
