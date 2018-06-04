import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
    selector: 'parques',
    templateUrl: './parques.component.html'
   
})
export class ParquesComponent implements OnChanges, OnInit, DoCheck, OnDestroy{
    @Input() nombre: string; //viene desde TIENDA
    @Input() metros: number;
    public vegetacion: string;
    public abierto: boolean;

    @Output() pasameLosDatos = new EventEmitter();

    constructor(){
        this.nombre = 'Parque natural para caballos';
        this.metros = 450;
        this.vegetacion = 'Alta';
        this.abierto = true;
    }

    ngOnChanges(changes: SimpleChanges){//se ejecuta cuando se modifica cualquier propiedad
        console.log(changes);
        console.log("Existen cambios en las propiedades");
    }

    ngOnInit(){//al iniciar el componente 1 vez
        console.log('Metodo on init lanzado');
    }

    ngDoCheck(){//cada vez k hacemos un cambio, siempre despues del INit
        console.log('El DoCheck se ha ejecutado')
    }

    ngOnDestroy(){//cuando se elina el componete osea no tiene nada
        console.log('Se va a eliminar el componente');
    }

    emitirEvento(){
        this.pasameLosDatos.emit({
            'nombre': this.nombre,
            'metros': this.metros,
            'vegetacion':this.vegetacion,
            'abierto': this.abierto,

        });
    }
}