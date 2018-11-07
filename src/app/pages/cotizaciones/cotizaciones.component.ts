import { Component, OnInit } from '@angular/core';
import { Cotizacion } from '@models/models.index';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { CotizacionService } from '@services/cotizacion/cotizacion.service';

// Librerias externas
import swal from 'sweetalert2';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss']
})
export class CotizacionesComponent implements OnInit {

  private cotizaciones: Cotizacion[];
  private nextDates: any;
  private id = '';

  constructor(
    private _cotizacionServices: CotizacionService,
    private _router: Router,
    private _acrouter:  ActivatedRoute
  ) { 
    this.cotizaciones = [];
    this.nextDates = undefined;

    this._acrouter.params.subscribe( (params: any) => {
      this.id = params['id'];
      this.cotizaciones = [];
      this.nextDates = undefined;

      this.getCotizacionesById(this.id);
    });
  }

  ngOnInit() {
    if (!this.id)  {
      this.getCotizaciones();
    }
  }

  public get() {
    if (this.id) {
      this.getCotizacionesById(this.id);
    } else {
      this.getCotizaciones();
    }
  }

  public getCotizaciones () {

    let page = this.nextDates;

    this._cotizacionServices.getCotizaciones(page)
      .subscribe( (res: any) => {

        res.Items.forEach( (item: Cotizacion) => {
           this.cotizaciones.push(item);
        });
        
        this.nextDates = res.LastEvaluatedKey;
      });
  }

  public getCotizacionesById (id: string) {
    let page = this.nextDates;

    this._cotizacionServices.getCotizacionesById(id, page)
      .subscribe( (res: any) => {
        res.Items.forEach( (item: Cotizacion) => {
          this.cotizaciones.push(item);
       });
       
       this.nextDates = res.LastEvaluatedKey;
      });
  }

  public delete (cotizacion: Cotizacion) {
    
    swal({
      title: 'Alto!',
      text: '¿Esta seguro de querer borrar la cotización?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!'
    })
    .then( (res: any) => {
      if (res.value) {
        this.deleteCotizacion(cotizacion);
      }
    });
  }

  public deleteCotizacion (cotizacion: Cotizacion) {
    this._cotizacionServices.deleteCotizacion(cotizacion)
      .subscribe(
        () => {
          swal(
            'Exito!!',
            'La cotización se ha borrado',
            'success'
          );

          const position = this.cotizaciones.indexOf(cotizacion);

          this.cotizaciones.splice(position, 1);
        },
        (err) => {
          console.log(err);
          swal(
            'Error!!',
            'Algo ha ocurrido al borrar la cotización',
            'error'
          );
        }
      );
  }
}
