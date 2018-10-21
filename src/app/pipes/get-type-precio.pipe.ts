import { Pipe, PipeTransform } from '@angular/core';

// Class
import { ItemLista } from '@models/models.index';
import { TipoCliente } from 'app/enums/tipo-cliente.enum';


@Pipe({
  name: 'getTypePrecio',
  pure: false
})
export class GetTypePrecioPipe implements PipeTransform {

  transform(item: ItemLista, tipo: TipoCliente, t?: boolean): any {

    let producto = item.producto;

    let precio: any;

    precio = (tipo === TipoCliente.PUBLICO) ? producto.precio.publico : producto.precio.distribuidor_ocasional;
    
    if (t) {
      precio = (tipo === TipoCliente.PUBLICO) ? 'Publico' : 'Distribuidor Ocasional';
    }
    
    return precio;
  }

}
