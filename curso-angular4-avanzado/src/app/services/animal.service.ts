import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class AnimalService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    addAnimal(token, animal){
        let params = JSON.stringify(animal);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url+'animal', params, {headers: headers})
                        .map(res => res.json());
    }


    getAnimals(){
        return this._http.get(this.url+'animals').map(res => res.json())
    }



    getAnimal(id){
        return this._http.get(this.url+'animal/'+id).map(res => res.json())
    }


    editAnimal(token, id, animal){
        let params = JSON.stringify(animal);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url+'animal/'+id, params, {headers: headers}  )
                .map(res => res.json());

    }

    deleteAnimal(token, id){
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({headers: headers});
        return this._http.delete(this.url+'animal/'+id, options).map(res => res.json());
    }
}