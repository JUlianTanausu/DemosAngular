import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global'

@Component({
    selector: 'listUsers',
    templateUrl: './list_user.component.html',
    providers: [UserService]
})
export class ListUsersComponent implements OnInit{
    public title: string;
    public users: User[];
    public url;
    public identity;
    public status: string;
    public token;
    public user: User;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = "Listado Usuarios";
        this.url = GLOBAL.url;
        this.identity = this.user;
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

    }


    ngOnInit(){
        this.getUsers();
        this.identity = this._userService.getIdentity();
    }

    ngDoCheck(){
        
        this.identity = this._userService.getIdentity();
    }


    getUsers(){
        this._userService.getUsers().subscribe(
            response =>{
                if(!response.users){

                }else{
                    this.users = response.users;
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }


    



    //delete
    deleteUser(id){
        this._userService.deleteUser(id).subscribe(
            response =>{
                if(!response){
                    alert('Error en el servidor');
                  }
                  this.getUsers();
            },
            error => {
                console.log(<any>error);
                this.getUsers();
            }
        );
    }

}