export class Cliente {

    constructor (
        public correo: string,
        public estado: string,
        public telefono: number,
        public nombre: string,
        public local: boolean,
        public direccion?: string,
        public codigo_postal?: string,
        public colonia?: string,
        public referencia?: string,
        public ciudad?: string,
        public lista_cotizaciones?: Array<string>,
        public numero_compras?: number,
        public total_compras?: number,
        public tipo_cliente?: string
    ) {}
}
