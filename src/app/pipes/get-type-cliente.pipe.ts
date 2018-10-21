import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTypeCliente'
})
export class GetTypeClientePipe implements PipeTransform {

  transform(tipo: number): any {
    return (tipo === 0) ? 'Publico' : 'Distribuidor Ocasional';
  }

}
