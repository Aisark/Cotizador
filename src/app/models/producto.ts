export class Producto {

    constructor(
        public tipo: string,
        public name: string,
        public precio?: object,
        public isAviable?: boolean,
        public descripcion?: string,
        public modoUso?: string,
    ) {}
}
