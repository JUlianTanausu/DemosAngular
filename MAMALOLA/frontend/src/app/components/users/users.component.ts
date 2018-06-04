import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global'

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    providers: [UserService]
})
export class UsersComponent implements OnInit{
    public title: string;
    public users: User[];
    public url;
    public identity;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Listado Usuarios';
        this.url = GLOBAL.url;
        
    }

    ngOnInit(){
        console.log('Componente de users argado')
        this.getUsers();
        this.identity = this._userService.getIdentity() ;
        
    }

    ngDoCheck(){
        this.identity = this._userService.getIdentity() ;
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


    deleteUser(id){
        console.log(id);
        this._userService.deleteUser(id).subscribe(
          response =>{
            if(!response){
              alert('Error en el servidor');
            }
            this.getUsers();
          },
          error =>{
            //alert('Error en el servidor');
            this.getUsers();//no deberia ir aki, pero asi me va
          }
        );
      }


}