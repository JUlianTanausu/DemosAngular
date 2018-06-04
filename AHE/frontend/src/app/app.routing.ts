
import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";


//Components
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




const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'Home', component: HomeComponent},
    {path: 'register', component: UserRegisterComponent},
    {path: 'amigo', component: AmigoResgisterComponent},
    {path: 'list', component: ListUsersComponent},
    {path: 'login', component: LoginComponent},
    {path: 'edit', component: UserEditComponent},
    {path: 'Tenerife', component: TenerifeComponent},
    {path: 'Madrid', component: MadridComponent},
    {path: 'detail', component: DetailSocioComponent},
    {path: 'evento', component: EventComponent},

    {path: '**', component: HomeComponent},
    
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);