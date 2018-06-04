import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../../services/global';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { Animal } from '../../../models/animal';
import { fadeLateral } from '../../animation'; 

@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  providers: [AnimalService,UserService ],
  animations: [fadeLateral]
  
})
export class ListComponent implements OnInit{
  public title: string;
  public numbers = new Array(10);
  public animals: Animal[];
  public token;
  public busqueda;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService,
    private _userService: UserService,
  ){
    this.title = 'Listado animales';
    this.token = this._userService.getToken();
 
  }

  ngOnInit(){
    this.getAnimals();
  }


  getAnimals(){
    this._animalService.getAnimals().subscribe(
      response =>{
        if(!response.animals){
          
        }else{
          this.animals = response.animals;
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  deleteAnimal(id){
    $('#myModal-'+id).modal('hide');
    this._animalService.deleteAnimal(this.token, id).subscribe(
      response =>{
        if(!response.animal){
          alert('Error en el servidor');
        }
        this.getAnimals();
      },
      error =>{
        //alert('Error en el servidor');
        this.getAnimals();//no deberia ir aki, pero asi me va
      }
    );
  }
  
}
