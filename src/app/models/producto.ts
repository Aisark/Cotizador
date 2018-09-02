export class Producto {

    constructor(
        public title: string,
        public tipo: string,
        public precio: object = {
            publico: Number,
            dOcasional: Number,
            dPreferencial: Number
        },
        public isAviable: boolean,
        public descripcion?: string,
        public modoUso?: string,
    ) {}
}
