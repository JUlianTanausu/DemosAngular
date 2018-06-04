import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'user-register',
    templateUrl: './userRegister.component.html',
    providers: [UserService]
})
export class UserRegisterComponent implements OnInit{
    public title: string;
    public user: User;
    public status: string;
    

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Registrate';
        this.user = new User("","","","","","","ROLE_USER","");
    }

    ngOnInit(){
        console.log('Componente de users argado')
    }


    onSubmit(form){
        //en el html ya modifico las variables de USER
        //console.log(this.user);

        //subscribe recoje lo k devuelve el api
        this._userService.register(this.user).subscribe(
            response => {
                if(response.user  && response.user._id){
                    //console.log(response.user);
                    this.status = 'success';
                    form.reset();
                    this._router.navigate(['/users']);
                }else{
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }


}