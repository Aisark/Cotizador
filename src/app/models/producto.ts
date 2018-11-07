export class Producto {

    constructor(
        public tipo: string,
        public name: string,
        public precio?: Precio,
        public isAviable?: boolean,
        public descripcion?: string,
        public modoUso?: string,
    ) {}
}

class Precio {
    publico: number;
    distribuidor_preferencial: number;
    distribuidor_ocasional: number;
}
