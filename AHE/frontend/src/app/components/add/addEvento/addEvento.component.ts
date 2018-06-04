import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Evento } from '../../../models/evento';
import { Seccion } from '../../../models/seccion';
import { SeccionService } from '../../../services/secciones.service';
import { EventoService } from '../../../services/evento.service';

@Component({
    selector: 'newEvent',
    templateUrl: 'addEvento.component.html',
    providers: [EventoService,SeccionService]
})
export class EventComponent implements OnInit{
    public title: string;
    public status: string;
    public evento: Evento;
    public secciones: Seccion[];
    public seccions: Seccion[];
    public fecha1: String;
    

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _eventoService: EventoService,
        private _seccionService: SeccionService,
        
    ){
        this.title = "Nuevo Evento";
        this.evento = new Evento("","","","","","","","");
        this.seccions = JSON.parse(localStorage.getItem('secciones'));
    }

    ngOnInit(){
        this.getSecciones();
        
               
    }

    ngAfterViewInit(){
        $(document).ready(function() {
            $('select').material_select();
          });


          $('.datepicker').pickadate({
            labelMonthNext: 'Mes siguiente',
            labelMonthPrev: 'Mes anterior',
            labelMonthSelect: 'Selecciona un mes',
            labelYearSelect: 'Selecciona un año',
            monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
            monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
            weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
            weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],

            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Hoy',
            clear: 'Limpiar',
            close: 'Cerrar',
            closeOnSelect: true, // Close upon selecting a date,
            firstDay: true,
            
          });



          $('.timepicker').pickatime({
            default: 'now', // Set default time: 'now', '1:30AM', '16:30'
            fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
            twelvehour: false, // Use AM/PM or 24-hour format
            donetext: 'OK', // text for done-button
            cleartext: 'Limpiar', // text for clear-button
            canceltext: 'cerrar', // Text for cancel-button
            autoclose: true, // automatic close timepicker
            ampmclickable: true, // make AM PM clickable
            
          });

        
       
    }

    

    onSubmit(form){
        this.evento.date= $("#fecha").val();
        this.evento.seccion= $("#seccion").val();
        this.evento.hora= $("#hora").val();
        console.log(this.evento);
       
        this._eventoService.register(this.evento).subscribe(
            response =>{
                console.log('response', response)
                if(response.evento){
                    this.status = 'success';
                    form.reset();
                    this._router.navigate(['/home']);
                }else{
                    this._router.navigate(['/home']);
                }
            },
            error => {
                console.log(<any>error);
            }
        );

        
    }



    getSecciones(){
        this._seccionService.getSecciones().subscribe(
            response =>{
                
                if(!response){
                    

                }else{
                    this.secciones = response.secciones;
                    
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}