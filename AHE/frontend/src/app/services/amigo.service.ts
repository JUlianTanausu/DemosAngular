import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';
import { Amigo } from '../models/amigo';
import 'rxjs/add/operator/map';

@Injectable()
export class AmigoService{
    public url: string;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }


    // REGISTER
    register(amigo: Amigo): Observable<any>{
        let params = JSON.stringify(amigo);

        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'registerAmigo', params, {headers:headers});

    }

}