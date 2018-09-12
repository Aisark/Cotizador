import { Producto } from './producto';
import { Usuario } from './usuario';
import { ItemLista } from './item-lista';


export class Cotizacion {

    constructor(
        public id: string,
        public usuario: string,
        public fecha?: string,
        public status?: string,
        public cliente?: Usuario,
        public lista_productos?: Array<ItemLista>,
        public totalCompra?: number
    ) {}
}
