import { Producto } from './producto';


export class ItemLista {
    constructor(
        public cantidad: number,
        public producto: Producto
    ) {}
}
