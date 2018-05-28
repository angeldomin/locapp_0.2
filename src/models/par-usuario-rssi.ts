export class ParUsuarioRSSI {
    constructor(             
        public usuario: string,
        public uuid: string,
        public rssi: number,
        public warning: boolean,
        public danger: boolean
    ) {}
}