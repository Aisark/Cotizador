import { EstatusCotizacion } from '../enums/estatus-cotizacion.enum';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estatusPedidoColor'
})
export class EstatusPedidoColorPipe implements PipeTransform {
  
  private estatusCotizacion = EstatusCotizacion;

  transform(status: any): string {
    let color = 'badge ';

    switch (status) {
      case this.estatusCotizacion.Entregado:
        color += 'badge-success';
        break;
      case this.estatusCotizacion.Pagado:
        color += 'badge-info';
        break;
      case this.estatusCotizacion.Pendiente:
        color += 'badge-warning';
        break;
    }

    return color;
  }

}
