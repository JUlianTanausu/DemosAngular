import { Component } from '@angular/core';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Productos Angular 4';
  public header_color: string;  //esta es de global = store

  constructor(){
    this.header_color = GLOBAL.header_color; //en global ya esta en azul
  }
}
