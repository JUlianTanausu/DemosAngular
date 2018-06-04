import { Component } from '@angular/core';

@Component({
    selector: 'fruta',
    templateUrl: './fruta.component.html',
 
})

export class FrutaComponent{
    public nombre_componente = 'Componente de Fruta';
    public listado_frutas = 'Naranja, Manzana, Pera y Sandia';
    
    public nombre:string;
    public edad:number;
    public mayorDeEdad:boolean;
    public trabajos:Array<any> = ['Carpintero',44, 'Fontanero'];
    comodin:any = 'Cualquier cosa';

    constructor(){
        this.nombre = 'Julian Tanausu';
        this.edad = 17;
        this.mayorDeEdad = true;
        this.comodin = "SI";

        
    }

    //metodos nada mas arrancar
    ngOnInit(){
        this.cambiarNombre();
        this.cambiarEdad(45);
        console.log(this.nombre + " " + this.edad);

        // variables y alcance
        var uno = 8;
        var dos = 15;

        if(uno == 8){
            let uno = 3; //let -> no la cambia de forma global, solo en el if
            var dos = 88;
            console.log("DENTRO DEL IF: " + uno)
        }
    }


    cambiarNombre(){
        this.nombre = 'Pepe';
        
    }

    cambiarEdad(edad){
        this.edad = edad;
        
    }
}