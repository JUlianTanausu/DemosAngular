import { Component, Input , Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'componente-hijo',
    template: `
        <p>Este es el {{title}}</p>
        <ul>
            <li>{{propiedad_uno}}</li>
            <li>{{propiedad_dos.web}}</li>
        </ul>


        <button (click)="enviar()">Enviar datos al padre</button>
    `
})
export class HijoComponent {
    public title: string;

    //---------------------------
    // @Input() -> PAra decirle k estas variables van a llegar desde fuera
   @Input() propiedad_uno: string;                                    
   @Input() propiedad_dos: string; 
    //---------------------------



    //---------------------------
    //para enviar datos a fuera, a otro componente desde el boton
        @Output() desde_el_hijo = new EventEmitter();




    constructor(){
        this.title = "Componente Hijo";
        
    }

    ngOnInit(){
        console.log(this.propiedad_uno);
        console.log(this.propiedad_dos);
        this.enviar(); //asi se los envia automaticamente
    }

    enviar(){
        this.desde_el_hijo.emit({
                            nombre: 'Julian TANAUSU WEB', 
                            web: 'julian.es',
                            twitter: '@hulian'
                        });
    }
}