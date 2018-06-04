import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AdminGuard implements CanActivate{

    constructor(
        private _router: Router,
        private _userService: UserService
    ){}

    canActivate(){
        let identity = this._userService.getIdentity();

        if(identity && identity.role == 'ROLE_ADMIN'){
            return true;
        }else{
            this._router.navigate(['/']);
            return false;
        }
    }
}