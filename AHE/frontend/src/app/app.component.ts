import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { SeccionService } from './services/secciones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global';
import { Seccion } from './models/seccion';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService,SeccionService],

  
})
export class AppComponent implements OnInit {
  public title: string;
  public seccions: Seccion[];
  public identity;
  public url: string;
  public status: string;
  public token;

  constructor(
    private _seccionService: SeccionService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.title = 'AHE';
    this.url = GLOBAL.url;
  }


  ngOnInit(){
    this.getSecciones();
    
    $('.slider').slider();
    
    $(".button-collapse").sideNav();
    $(".dropdown-button").dropdown();
    this.identity = this._userService.getIdentity() ;
    
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity() ;
  }
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }

  getSecciones(){
    
    this._seccionService.getSecciones().subscribe(
      response =>{
        if(!response.secciones){

        }else{
          this.seccions = response.secciones;
          // PERSISTIR TOKEN DEL USUARIO
          localStorage.setItem('secciones',JSON.stringify(this.seccions));
        }
      },
      error => {
        console.log(<any>error);
      }

    );
  }

}
