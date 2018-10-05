import { Component, OnInit } from '@angular/core';
import { Cotizacion } from '@models/models.index';

// Services
import { CotizacionService } from '@services/cotizacion/cotizacion.service';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss']
})
export class CotizacionesComponent implements OnInit {

  private cotizaciones: Cotizacion[];
  private nextDates: any;

  constructor(
    private _cotizacionServices: CotizacionService,
  ) { 
    this.cotizaciones = [];
    this.nextDates = undefined;
  }

  ngOnInit() {
    this.getCotizaciones();
  }

  getCotizaciones () {

    let page = this.nextDates;

    this._cotizacionServices.getCotizaciones(page)
      .subscribe( (res: any) => {

        res.Items.forEach( (item: Cotizacion) => {
           this.cotizaciones.push(item);
        });
        
        this.nextDates = res.LastEvaluatedKey;
      });
  }

}
