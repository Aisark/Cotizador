import { Component, OnInit } from '@angular/core';
import { Cotizacion } from '@models/models.index';
import { Router, ActivatedRoute } from '@angular/router';

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

}
