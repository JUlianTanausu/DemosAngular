import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Amigo } from '../../../models/amigo';
import { AmigoService } from '../../../services/amigo.service';

@Component({
    selector: 'register-amigo',
    templateUrl: 'addAmigo.component.html',
    providers: [AmigoService]
})
export class AmigoResgisterComponent implements OnInit{
    public title: string;
    public amigo: Amigo;
    public status: string;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _amigoService: AmigoService,
    ){
        this.title = "AMIGO";
        this.amigo = new Amigo("","");
    }


    ngOnInit(){
        
    }

    onSubmit(form){
        this._amigoService.register(this.amigo).subscribe(
            response => {
                console.log(response);
                if(response.amigo){
                    this.status = 'success';
                    form.reset();
                    this._router.navigate(['/home']);
                }else{
                    this.status = 'error';
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }
}