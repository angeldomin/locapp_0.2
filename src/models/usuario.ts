export class Usuario {
    constructor( 
        public _id: string,
        public nombre: string,        
        public distancia_warning: number,
        public distancia_danger: number,
        public id_dispositivo: string
    ) {}
}