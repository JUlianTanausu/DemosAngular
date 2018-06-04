import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';


@Component({
    selector: 'producto-detail',
    templateUrl: '../views/producto-detail.html',
    providers: [ProductoService]
})
export class ProductoDetailComponent{
    public producto : Producto;

    constructor(
        private _prodcutoService: ProductoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){}

    ngOnInit(){ // lo k hace al iniciar la url
        console.log('producto-detail.Component.ts cargado..');
        this.getProducto();
    }


    getProducto(){
        this._route.params.forEach((params) => {
            let id = params['id']; // cojo el id del enlace

           // alert(id); // saca en un alert el id de la url
           this._prodcutoService.getProducto(id).subscribe(
               response =>{
                    if(response.code == 200){
                        this.producto = response.message;
                    }else{// si falla
                        this._router.navigate(['/productos']);//redirecciona
                    }
               },
               error => {
                   console.log(<any>error);
               }
           );
        });
    }


}