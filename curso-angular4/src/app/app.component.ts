import { Component } from '@angular/core';

@Component({
  selector: 'app-root', //etiqueta para usar en el html
  templateUrl: './app.component.html', // fichero html que carga, en la etiqueta app-root
  styleUrls: ['./app.component.css'] // los estilos del html
})
export class AppComponent {
  title = 'Componente base principal';
}
