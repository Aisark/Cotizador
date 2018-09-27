import { ItemLista } from './item-lista';
import { DatosCliente } from './datos-cliente';
import { EstatusCotizacion } from '../enums/estatus-cotizacion.enum';



export class Cotizacion {

    constructor(
        public id: string,
        public numero: number,
        public cliente?: DatosCliente,
        public status?: EstatusCotizacion,
        public lista_productos?: Array<ItemLista>,
        public totalCompra?: number,
        public envio_gratis?: boolean,
        public peso?: number,
        public guia_rastreo?: number
    ) {}
}
