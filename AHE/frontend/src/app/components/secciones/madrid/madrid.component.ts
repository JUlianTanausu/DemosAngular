import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SeccionService } from '../../../services/secciones.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../../services/global';
import { User } from '../../../models/user'

@Component({
    selector: 'Madrid',
    templateUrl: './madrid.component.html',
    providers: [UserService, SeccionService]
})
export class MadridComponent implements OnInit{
    public title: string;
    public users: User[];
    public url;
    public identity;
    public status: string;
    public token;
    public user: User;
    public cont: number;
    public idSeccion: string;
    public count: string;


    constructor(
        private _userService: UserService,
        private _seccionService: SeccionService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Madrid';
        this.idSeccion = null;
        this.url = GLOBAL.url;
        this.identity = this.user;
    }

    ngOnInit(){
        
        $('ul.tabs').tabs();
        this.getInfoSeccion();
        
         
          
    }

    getInfoSeccion(){
        this._seccionService.getSeccion('Madrid').subscribe(
            response =>{
               
                if(!response){

                }else{
                    var id = response.seccion[0]._id;
                    this.getCountSocios(id);
                    this.getUsers(id);
                    this.idSeccion = response.seccion[0]._id;
                    
                }

            },
            error => {
                console.log(<any>error);
            }
        );
        
    }

    getCountSocios(id){
        this._userService.getCount(id).subscribe(
            response => {
                if(!response){

                }else{
                    this.count = response.count;

                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }


    getUsers(id){
        this._userService.getUsersSeccion(id).subscribe(
            response => {
                if(!response){

                }else{
                    this.users = response.users;
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }



}