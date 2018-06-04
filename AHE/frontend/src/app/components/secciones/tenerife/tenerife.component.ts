import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SeccionService } from '../../../services/secciones.service';
import { EventoService } from '../../../services/evento.service';
import { UploadService } from '../../../services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../../services/global';
import { User } from '../../../models/user';
import { Evento } from '../../../models/evento';

@Component({
    selector: 'Tenerife',
    templateUrl: './tenerife.component.html',
    providers: [UserService,SeccionService, EventoService,UploadService]
})
export class TenerifeComponent implements OnInit{
    public title: string;
    public users: User[];
    public events: Evento[];
    public eventoBorrar: Evento;
    public eventoActualizar: Evento;
    public url;
    public identity;
    public status: string;
    public token;
    public user: User;
    public nameEventoBorrar: String;
    public nameEventoEditar: String;
    public idEventoBorrar: String;
    public cont: number;
    public idSeccion: String;
    public count: String;
    public archivo: String;
    


    constructor(
        private _userService: UserService,
        private _seccionService: SeccionService,
        private _eventoService: EventoService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService
    ){
        this.title = 'Seccion Tenerife';
        this.url = GLOBAL.url;
        this.identity = this.user;
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.idSeccion = null;
        this.eventoActualizar = new Evento("","","","","","","","");
        
        
    }

    ngOnInit(){
        this.identity = this._userService.getIdentity() ;

        $(document).ready(function(){
            // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
            $('.modal').modal();
          });
       
        
            $('ul.tabs').tabs();
            
          

         
          
        this.getInfoSeccion();
       
        $(document).ready(function(){
            $('.collapsible').collapsible();
          }); 
        
          
    }
    ngAfterViewInit(){
        
        $(document).ready(function(){
            $('.collapsible').collapsible();
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
    }

    

    ngDoCheck(){
        
    }

    getInfoSeccion(){
        this._seccionService.getSeccion('Tenerife').subscribe(
            response =>{
               
                if(!response){

                }else{
                    this.eventoActualizar.seccion = response.seccion;
                    var id = response.seccion[0]._id;
                    this.getCountSocios(id);
                    this.getUsers(id);
                    this.getEventos(id);
                    this.idSeccion = response.seccion[0]._id;
                    
                }

            },
            error => {
                console.log(<any>error);
            }
        );
       
    }

    getCountSocios(id){
        this._userService.getCount(id).subscribe(
            response => {
                if(!response){

                }else{
                    this.count = response.count;
                    
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    getUsers(id){
        this._userService.getUsersSeccion(id).subscribe(
            response => {
                
                if(!response){

                }else{
                    this.users = response.users;
                    
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    detail(id){
        localStorage.setItem('ID', JSON.stringify(id));

    }

    getEventos(idSeccion){
        this._eventoService.getEventoSeccion(idSeccion).subscribe(
            response => {
                
                if(!response){

                }else{
                    this.events = response.events;
                    
                }
                console.log(this.events);
            },
            error =>{
                console.log(<any>error);
            }
        );

    }

    borrarModal(event){
        this.eventoBorrar = event;
        this.nameEventoBorrar = this.eventoBorrar.name;
        this.idEventoBorrar = this.eventoBorrar._id;
    }

    editarModal(event){
        this.eventoActualizar = event;
        //console.log(this.eventoActualizar);
        this.nameEventoEditar = this.eventoActualizar.name;
    }

    eliminar(){
        this._eventoService.delete(this.idEventoBorrar).subscribe(
            response =>{
                if(!response){
                    alert('Error en el servidor');
                }
                this.getEventos(this.idSeccion);
            },
            error =>{
                console.log(<any>error);
                this.getEventos(this.idSeccion);
            }
        );
    }


    actualizar(){
        this.archivo = this.eventoActualizar.image;
        this.eventoActualizar.name= $("#name").val();
        this.eventoActualizar.descripcion= $("#descripcion").val();
        this.eventoActualizar.lugar= $("#lugar").val();
        this.eventoActualizar.date= $("#fecha").val();
        this.eventoActualizar.hora= $("#hora").val();
        this.eventoActualizar.image= $("#imagen").val();

        console.log(this.eventoActualizar);
        this._eventoService.actualizar(this.eventoActualizar).subscribe(
            response =>{
                if(!response.evento){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    //Subida de imagen de usuario
                    this._uploadService.makeFileRequest(this.url+'uploadImageEvento/'+this.eventoActualizar._id, [], this.filesToUpload, this.token, 'image')
                                            .then((result: any) =>{
                                                console.log(result);
                                                this.eventoActualizar.image = result.event.image;
                                               
                                              
                                            })
                }
            },
            error =>{
                var errorMessage = <any>error;

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
        
    }

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }

    
}