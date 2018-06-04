import { Component, DoCheck, OnInit } from '@angular/core';


@Component({
    selector: 'guardar-email',
    template: `
            <h4>{{tittle}}</h4>

<input type="text" [(ngModel)]="emailContacto"/>
<button (click)="guardarEmail()">Guardar email</button>
            `,
    
})
export class GuardarEmailComponent implements DoCheck, OnInit{
    public title = 'Guardar email';
    public emailContacto: string;

    ngOnInit(){
        
    }

    ngDoCheck(){
        
    }

    guardarEmail(){
    
        localStorage.setItem('emailContacto', this.emailContacto);
    }



}