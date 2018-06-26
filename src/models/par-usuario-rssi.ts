export class ParUsuarioRSSI {
    constructor(             
        public usuario: string,
        public uuid: string,
        public rssi: number,
        public distancia_warning: number,
        public distancia_danger: number,
        public warning: boolean,
        public danger: boolean,
        public distancias:{
            upper:number,
            lower:number
          }
    ) {}
}