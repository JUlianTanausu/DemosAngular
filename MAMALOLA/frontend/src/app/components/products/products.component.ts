import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    providers: [UserService]
})
export class ProductsComponent implements OnInit{
    public title: string;
    

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Listado Productos';
        
    }

    ngOnInit(){
        console.log('Componente de users argado')
    }



}