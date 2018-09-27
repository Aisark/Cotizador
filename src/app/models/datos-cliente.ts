import { TipoCliente } from 'app/enums/tipo-cliente.enum';


export class DatosCliente {
    
    public direccion?: string;
    public codigo_postal?: string;
    public colonia?: string;
    public referencia?: string;
    public ciudad?: string;
    public tipo_cliente?: TipoCliente;

    constructor (
        public correo: string,
        public estado: string,
        public telefono: number,
        public nombre: string,
        public local: boolean,
    ) {}
}
