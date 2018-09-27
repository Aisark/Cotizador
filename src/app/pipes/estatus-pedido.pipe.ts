import { Pipe, PipeTransform } from '@angular/core';
import { EstatusCotizacion } from '../enums/estatus-cotizacion.enum';


@Pipe({
  name: 'estatusPedido'
})
export class EstatusPedidoPipe implements PipeTransform {

  private estatusCotizacion = EstatusCotizacion;

  transform(status: number): String {

    let statusString = '';

    switch (status) {
      case this.estatusCotizacion.Entregado:
        statusString = 'Entregado';
        break;
      case this.estatusCotizacion.Pagado:
        statusString = 'Pagado';
        break;
      case this.estatusCotizacion.Pendiente:
        statusString = 'Pendiente';
        break;
      default:
        statusString = `sin case: ${status}`;
    }

    return statusString;
  }

}
