import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [UserService]
})
export class HomeComponent implements OnInit{
    public title: string;
    public user: User;
    public status: string;
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Identificate';
        this.user = new User("","","","","","","ROLE_USER","");
    }

    ngOnInit(){
        console.log('Componente de loginc argado')
    }

    onSubmit(){
       // alert(this.user.email);
      //  alert(this.user.password);
        console.log(this.user);


       //loguear al usuario y conseguir sus datos
       this._userService.signup(this.user).subscribe(
            response =>{
                this.identity = response.user;
                //console.log(this.identity);
                if(!this.identity || !this.identity._id){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    // PERSISTIR DATOS DEL USUARIO
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    //Conseguir token
                    this.getToken();
                    this._router.navigate(['/products']);
                }
                
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
       );
    }


    getToken(){
        this._userService.signup(this.user, 'true').subscribe(
            response =>{
                this.token = response.token;
                console.log(this.token);
                if(this.token.length <= 0){
                    this.status = 'error';
                }else{
                    
                    // PERSISTIR TOKEN DEL USUARIO
                    localStorage.setItem('token', this.token);


                    
                }
                
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
       );
    }





}