import { Pipe, PipeTransform } from '@angular/core';

// Class
import { ItemLista } from '@models/models.index';
import { TipoCliente } from 'app/enums/tipo-cliente.enum';


@Pipe({
  name: 'getTypePrecio',
  pure: false
})
export class GetTypePrecioPipe implements PipeTransform {

  transform(item: ItemLista, tipo: TipoCliente): number {

    let producto = item.producto;

    let precio = (tipo === TipoCliente.PUBLICO) ? producto.precio.publico : 
                 (tipo === TipoCliente.DISTRIBUIDOR_OCASIONAL) ? producto.precio.distribuidor_ocasional :
                 producto.precio.distribuidor_preferencial;
    
    

    return precio;
  }

}
