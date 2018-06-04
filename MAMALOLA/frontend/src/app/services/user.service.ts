// para conectar a la api se usan estos servicios

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    public url:string;
    public identity;
    public token;
    public stats;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }

    //forma nueva devuelbe observable, any xk no sabemos k campos va tener
    register(user: User): Observable<any>{
        //console.log(user_to_register);
        //console.log(this.url);

        let params = JSON.stringify(user); //jSON convertido a string
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'register', params, {headers:headers});


    }

    //login
    signup(user, gettoken = null): Observable<any>{
        if(gettoken != null){
            
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'login', params, {headers: headers});
    }


    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }


        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }

    getUsers(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization',this.getToken());

        return this._http.get(this.url+'users', {headers: headers});
    }

    updateUser(user: User):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());

        return this._http.put(this.url+'update-user/'+user._id, params, {headers: headers});
    }

    deleteUser(id){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization',this.getToken());

        
        return this._http.delete(this.url+'deleteUser/'+id, {headers: headers});
    }

}
