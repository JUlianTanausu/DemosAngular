import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User  } from '../../../models/user';

import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';


@Component({
    selector: 'edit',
    templateUrl :'edit_user.component.html',
    providers: [UserService]
})
export class UserEditComponent implements OnInit{
    public title: string;
    public user: User;
    
    public identity;
    public token;
    public users: User[];
    public status: string;
    public url: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        
    ){
        this.title = 'Actualizar mis datos';
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){
      
    }


    onSubmit(){
        this._userService.updateUser(this.user).subscribe(
            response =>{
                if(!response.user){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    localStorage.setItem('identity', JSON.stringify(this.user)); //let identity = JSON.parse(localStorage.getItem('identity'));
                    this.identity = this.user;
                    this._router.navigate(['/list']);
                }
            },
            error =>{
                var errorMessage = <any>error;

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }


    
}