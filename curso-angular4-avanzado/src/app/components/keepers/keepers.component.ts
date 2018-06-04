import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service'; 
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'keepers',
  templateUrl: './keepers.component.html',
  providers: [UserService],
  //los estilos van a ser globales en toda la app
  animations: [fadeIn]
})
export class keepersComponent implements OnInit{
    public title: string; 
    public keepers: User[];
    public url;

    constructor(
        private _userService: UserService
    ){
        this.title = 'Cuidadores';
        this.url = GLOBAL.url;
    }


    ngOnInit(){
        console.log('Keepers.component cargado!!!');
        this.getKeepers();
    }

    getKeepers(){
        this._userService.getKeepers().subscribe(
          response =>{
            if(!response.users){
              
            }else{
              this.keepers = response.users;
            }
          },
          error =>{
            console.log(<any>error);
          }
        );
      }

}
