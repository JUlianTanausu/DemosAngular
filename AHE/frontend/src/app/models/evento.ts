export class Evento{
    constructor(
        public _id: string,
        public name: string,
        public descripcion: string,
        public image: String,
        public date: String,
        public lugar: String,
        public hora: String,
        public seccion: String
    ){}
}