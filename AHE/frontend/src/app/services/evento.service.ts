import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';
import { Evento } from '../models/evento';
import 'rxjs/add/operator/map';


@Injectable()
export class EventoService{
    public url: string;
    public token;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }

    //TOKEN
    getToken(){
        let token = localStorage.getItem('token');

        if(token != undefined){
            this.token = token
        }else{
            this.token = null;
        }
        return this.token;
    }

    //REGISTER
    register(evento: Evento): Observable<any>{
        let params = JSON.stringify(evento);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization',this.getToken());

        return this._http.post(this.url+'saveEvento', params, {headers:headers});
    }

    //GET EVENTO SECCION
    getEventoSeccion(idSeccion): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

                        
        return this._http.get(this.url+'eventoSeccion/'+idSeccion, {headers: headers});
    }

    //BORRAR
    delete(id){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());

        return this._http.delete(this.url+'delete-evento/'+id, {headers: headers});
    }

    //ACTUALIZAR
    actualizar(evento: Evento):Observable<any>{
        let params = JSON.stringify(evento);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', this.getToken());

        return this._http.put(this.url+'updateEvento/'+evento._id, params, {headers: headers});
    }
}