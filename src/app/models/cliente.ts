import { DatosCliente } from './datos-cliente';

export class Cliente extends DatosCliente {

    public lista_cotizaciones?: Array<string>;
    public numero_compras?: number;
    public total_compras?: number;

    constructor (
        public correo: string,
        public estado: string,
        public telefono: number,
        public nombre: string,
        public local: boolean,
    ) {
        super(
            correo,
            estado,
            telefono,
            nombre,
            local
        );
    }
}
