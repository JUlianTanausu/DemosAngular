import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //necesario para data-binding
import {  routing, appRoutingProviders } from './app.routing'; //rooteo, paginacion

//aqui tienen que estar importados todos los documentos
import { AppComponent } from './app.component';
import { FrutaComponent } from './fruta/fruta.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CochesComponent } from './coches/coches.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PlantillasComponent } from './plantillas/plantillas.component';
import { HijoComponent } from './hijo/hijo.component';

import { ConversorPipe } from './pipes/conversor.pipe';


@NgModule({
  declarations: [
    AppComponent, //carga el componente
    FrutaComponent,
    EmpleadoComponent,
    HomeComponent,
    ContactoComponent,
    ConversorPipe,
    CochesComponent,
    PlantillasComponent,
    HijoComponent

  ],
  imports: [
    BrowserModule,
    FormsModule, // data-binding
    routing, // paginacion

    HttpClientModule,// para consultas a APIS
    HttpModule// para consultas a APIS
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]//principal
})
export class AppModule { }
