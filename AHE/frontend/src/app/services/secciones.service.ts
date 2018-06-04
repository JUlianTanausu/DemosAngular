import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Seccion } from '../models/seccion'
import 'rxjs/add/operator/map';

@Injectable()
export class SeccionService{
    public url:string;
    public identity;
    public token;
    public stats;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }



    // GET
    getSecciones(): Observable<any>{
        return this._http.get(this.url+'secciones'); 
    }

    // GET seccion
    getSeccion(name): Observable<any>{
        return this._http.get(this.url+'nameSeccion/'+name); 
    }
}