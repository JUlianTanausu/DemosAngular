import { Component } from '@angular/core';
//--- PARA USAR JQUERY --------
declare var jQuery:any;
declare var $:any;
//-----------------------------




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Julian Tanausu';
 

  public toggleTitle(){
    console.log('Le has dado click al boton');
    $('.title').slideToggle();
  }
}
