import { Component, OnInit } from '@angular/core';
import { Cotizacion, ItemLista, Usuario } from '@models/models.index';

// Services
import { CotizacionService } from '@services/cotizacion/cotizacion.service';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss']
})
export class CotizacionesComponent implements OnInit {

  private cotizaciones: Cotizacion[];
  private prevPage: any;
  private nextPAge: any;

  constructor(
    private cotizacion: CotizacionService
  ) { }

  ngOnInit() {
    this.getCotizaciones();
  }

  getCotizaciones (page?: any) {
    this.cotizacion.getCotizaciones(page)
      .subscribe( (res: any) => {
        this.cotizaciones = res.Items;
      });
  }

}
