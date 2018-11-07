import { TipoCliente } from '@enums/tipo-cliente.enum';
import { Producto } from '@models/producto';


export interface ItemCotizacion {
    cantidad: number;
    producto: Producto;
    importe: number;
}
