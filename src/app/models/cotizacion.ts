import { Producto } from './producto';
import { ItemLista } from './item-lista';
import { Cliente } from './cliente';


export class Cotizacion {

    constructor(
        public id: string,
        public numero: string,
        public cliente: Cliente,
        public status?: string,
        public lista_productos?: Array<ItemLista>,
        public totalCompra?: number,
        public envio_gratis?: boolean,
        public peso?: number,
        public guia_rastreo?: number
    ) {}
}
