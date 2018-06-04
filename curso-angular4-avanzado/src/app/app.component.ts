import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
//DoCheck cualkier cambia , ejecuta eso
export class AppComponent implements OnInit, DoCheck{
  public title: string;
  public identity;
  public url: string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.title = 'NGZOO';
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity() ;
   }

   ngDoCheck(){
    this.identity = this._userService.getIdentity() ;
   }
  
   logout(){
     localStorage.clear();
     this.identity = null;
     this._router.navigate(['/']);
   }
}
