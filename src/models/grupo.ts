import { Usuario } from "./usuario";

export class Grupo {
    constructor(
        public _id: string,     
        public nombre: string,        
        public descripcion: string,
        public usuarios: Usuario[]
    ) {}
}