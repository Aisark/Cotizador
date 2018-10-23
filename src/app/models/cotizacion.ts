import { EstatusCotizacion } from '../enums/estatus-cotizacion.enum';
import { ItemCotizacion } from '../interfaces/item-cotizacion';
import { Cliente } from './cliente';



export class Cotizacion {

    public id: string;
    public numero: number;
    public cliente?: Cliente;
    public status?: EstatusCotizacion;
    public lista_productos?: Array<ItemCotizacion>;
    public totalCompra?: number;
    public envio_gratis?: boolean;
    public peso?: number;
    public datos_envio?: DatosEnvio;
    constructor() {}
}


class DatosEnvio {
    public tracking?: Number;
    public direccion?: string;
    public colonia?: string;
    public cp?: string;
    public ciudad?: string; 
    public estado?: string;
}
