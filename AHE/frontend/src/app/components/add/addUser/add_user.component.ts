import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Seccion } from '../../../models/seccion';
import { SeccionService } from '../../../services/secciones.service';
import { SelectControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'register',
    templateUrl: 'add_user.component.html',
    providers: [UserService,SeccionService]
})
export class UserRegisterComponent implements OnInit{
    public title: string;
    public user: User;
    public status: string;
    public seccions: Seccion[];
   
    
    
    

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _seccionService: SeccionService
    ){
       
        this.title = "Registrate";
        this.user = new User("","","","","","","ROLE_USER","","");
        this.seccions = JSON.parse(localStorage.getItem('secciones'));
        

        
    }

    ngOnInit(){
        
       
    }
    ngDoCheck(){
        
        
    }
    ngAfterViewInit(){
        
        $(document).ready(function() {
            
            $('select').material_select();
           


          
            
  });
        
        
          
    }
    
    valido(){
       
            
           
 
    }

    onSubmit(form){
        
        this.user.seccion= $("#seccion").val();
        console.log(this.user);
        this._userService.register(this.user).subscribe(
            response => {
                if(response.user){
                    this.status = 'success';
                    form.reset();
                    this._router.navigate(['/list']);
                    
                }else{
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    

    
}

