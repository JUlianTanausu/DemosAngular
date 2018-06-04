import { Component } from '@angular/core';


@Component({
    selector: 'plantillas',
    templateUrl: './plantillas.component.html',
    
})
export class PlantillasComponent{
    public titulo;
    public administrador;

    //VARIABLES PARA PASARLE A COMPONENTE HIJO
    //-------------------------------------
    public dato_externo = "Julian Tanausu";
    public identity = {
        id: 1,
        web: 'julian.es',
        tematica: 'Desarrollo web'
    };
//-----------------------------------------
    constructor( ){
        this.titulo = "Plantillas ngTemplate en Angular";
        this.administrador = true;
    }

    cambiar(value){
        this.administrador = value;
    }


    public datos_del_hijo;
    recibirDatos(event){
        console.log(event.nombre);
        this.datos_del_hijo = event;
    }

    
}