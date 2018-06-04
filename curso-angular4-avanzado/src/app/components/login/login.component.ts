import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})
export class LoginComponent implements OnInit{
    public title: String;
    public user: User;
    public identity;
    public token;
    public status: String;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Login';
        this.user = new User('','','','','','ROLE_USER','');
    }

    ngOnInit(){
        console.log('login.component cargado');
        console.log(this._userService.getIdentity);
        console.log(this._userService.getToken);
    }

    onSubmit(){
        // Loguear al usuario y conseguir el objeto
       this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response.user;

                if(!this.identity ||!this.identity._id){
                    alert('El usuario no se ha logueado correctamente');
                }else{
                    this.identity.password ='';
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    //COnseguir el token
                        this._userService.signup(this.user, 'true').subscribe(
                            response => {
                                this.token = response.token;
                
                                if(this.token.length <= 0){
                                    alert('El token no se ha generado');
                                }else{
                                    localStorage.setItem('token', this.token);
                                    this.status='success';

                                    this._router.navigate(['/']);
                                }
                            },
                            error => {
                                //Mostrar el token
                                console.log(<any>error);                               
                            }
                    );
                }
            },
            error => {
                var errorMessage =<any>error;

                if(errorMessage != null){
                    var body = JSON.parse(error._body);
                    this.status = 'error';
                }
            }
       );
    }
}