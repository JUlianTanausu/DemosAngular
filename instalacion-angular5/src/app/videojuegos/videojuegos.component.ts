import { Component } from '@angular/core';

@Component({
    selector: 'videojuegos',
    templateUrl: './videojuegos.component.html'
})
export class VideojuegosComponent{
    public nombre:string;
    public mejor_juego:string;
    public mejor_juego_retro:string;
    public mostrar_retro:boolean;
    //public color = "yellow";
    public year:number;
    public videojuegos:Array<any>;//any -> cualquier tipo de dato


  constructor(){
      this.nombre = 'Videojuegos 2018';
      this.mejor_juego = 'GTA V';
      this.mejor_juego_retro = 'Super Mario 64';
      this.mostrar_retro = true;
      this.year = 2018;
      this.videojuegos = [
        'Los simpson hit and run',
        'Assins creed',
        'GTA 5',
        'Call od Duty',
        'Tekken'
    ];
  }
}