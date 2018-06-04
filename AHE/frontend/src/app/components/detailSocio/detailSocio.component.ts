import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'detail',
    templateUrl: 'detailSocio.component.html',
    providers: [UserService]
})
export class DetailSocioComponent implements OnInit{
    public tilte: string;
    public user: User;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
    ){
        this.tilte = "Detalles";
    }


    ngOnInit(){
        let identity = JSON.parse(localStorage.getItem('ID'))
        console.log(identity);
    }

    getDetalles(){
        
    }
}


//localStorage.setItem('identity', JSON.stringify(this.user));
//let identity = JSON.parse(localStorage.getItem('identity'));