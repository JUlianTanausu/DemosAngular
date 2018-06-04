export class Empleado{
    /*---- FORMA CLASICA ------
    public nombre:string;
    public edad:number;

    constructor(nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    }
   ----------------------- */
   constructor(
       public nombre:string,
       public edad:number,
       public cargo:string,
       public contratado:boolean
   ){}
}