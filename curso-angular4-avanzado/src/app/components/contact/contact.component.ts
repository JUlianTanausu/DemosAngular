import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  //los estilos van a ser globales en toda la app
  animations: [fadeIn]
})
export class ContactComponent implements OnInit{
    title = 'Contacto';
    emailContacto: string;


    ngOnInit(){
        console.log('contact.component cargado!!!');
    }

    guardarEmail(){
        //asi es accesible desde cualquier pagina, cualquier elemento. se guarda aunk recarges la web, como una cokkie
        //xk es almacenamiento del navegador
        localStorage.setItem('emailContacto', this.emailContacto);
        console.log(localStorage.getItem('emailContacto'));
    }

}
