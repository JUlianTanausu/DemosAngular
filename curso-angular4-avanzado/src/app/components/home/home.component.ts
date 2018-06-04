import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  //los estilos van a ser globales en toda la app
  animations: [fadeIn]
})
export class HomeComponent implements OnInit{
    title = 'Bienvenido a NGZOO';


    ngOnInit(){
        console.log('home.component cargado!!!');
    }

}
