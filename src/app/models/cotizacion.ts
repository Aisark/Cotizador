import { Producto } from './producto';
import { Usuario } from './usuario';


export class Itemlista {
    constructor(
        public cantidad: number,
        public producto: Producto
    ) {}
}


export class Cotizacion {

    constructor(
        public id: string,
        public nombreCliente?: string,
        public cliente?: Usuario,
        public fecha?: string,
        public lista_productos?: Array<Itemlista>,
        public totalCompra?: number
    ) {}
}
