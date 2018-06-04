import { Component } from '@angular/core';
import { Empleado } from './empleado';

@Component({
    selector: 'empleado-tag',
    templateUrl: './empleado.component.html'
})

export class EmpleadoComponent{
    public titulo = 'Componente Empleados';

    public empleado:Empleado;  //declaro un objeto Empleado
    public trabajadores:Array<Empleado>;
    public trabajador_externo:boolean;
    public color:string;
    public color_seleccionado:string;


    constructor(){
         //asi tenemos empleado en el html
         this.empleado = new Empleado('Julian', 28, 'becario', true);
         this.trabajadores = [
            new Empleado('Manolo', 35, 'administrativo', false),
            new Empleado('Ana', 25, 'cocinera', true),
            new Empleado('Victor', 66, 'programador', false),
         ];

         this.trabajador_externo = true;
         this.color = 'green';
         this.color_seleccionado = '#ccc';
    }

    ngOnInit(){
        console.log(this.empleado);
        console.log(this.trabajadores);
    }

    cambiarExterno(valor){
        this.trabajador_externo = valor;
    }

    logColorSeleccionado(){
        console.log(this.color_seleccionado);
    }

}