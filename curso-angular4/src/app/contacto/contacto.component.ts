import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; // para coger parametros de una URL

@Component({
    selector: 'contacto',
    templateUrl: './contacto.component.html'
})

export class ContactoComponent{
    public titulo = "Pagina de contacto de la web";
    public parametro;

    //VOY A RECOGER LOS PARAMETROS K SE LE ENCIAN A LA WEB DE CONTACTO
    constructor(
        private _route :ActivatedRoute,
        private _router: Router
    ){}

    ngOnInit(){
        this._route.params.forEach((params: Params) => {
            this.parametro = params['page'];
           
        });
    }

    //si no tiene parametro hace este metodo
    redirigir(){
        this._router.navigate(['/contacto','victorroblesweb.es'])
    }

    redirigirDos(){
        this._router.navigate(['/pagina-principal'])
    }

}