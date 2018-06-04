import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserRegisterComponent } from './components/add/addUser/add_user.component';
import { ListUsersComponent } from './components/list/listUser/list_user.component';
import { UserEditComponent } from './components/edit/edit_user/edit_user.component';
import { TenerifeComponent } from './components/secciones/tenerife/tenerife.component';
import { MadridComponent } from './components/secciones/madrid/madrid.component';
import { DetailSocioComponent } from './components/detailSocio/detailSocio.component';
import { AmigoResgisterComponent } from './components/add/addAmigo/addAmigo.component';
import { EventComponent } from './components/add/addEvento/addEvento.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserRegisterComponent,
    ListUsersComponent,
    UserEditComponent,
    TenerifeComponent,
    MadridComponent,
    DetailSocioComponent,
    AmigoResgisterComponent,
    EventComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
