import { Producto } from './producto';

export class AddListProducts {
    constructor(
        public isAdd: boolean,
        public producto: Producto
    ) {}
}
