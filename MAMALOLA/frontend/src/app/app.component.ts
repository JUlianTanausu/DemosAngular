
import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title: string;
  public identity;
  public url: string;


  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.title = 'MAMALOLA';
    this.url = GLOBAL.url;
  }




  ngOnInit(){
    $(".button-collapse").sideNav();
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
