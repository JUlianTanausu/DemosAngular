import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes
import { EmpleadoComponent } from './empleado/empleado.component';
import { FrutaComponent } from './fruta/fruta.component';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CochesComponent } from './coches/coches.component';
import { PlantillasComponent } from './plantillas/plantillas.component';

const appRoutes: Routes = [
    {path: '' ,component: EmpleadoComponent}, //cuando la url no tiene nada (principal)
    {path: 'empleado', component: EmpleadoComponent},
    {path: 'pagina-principal',component: HomeComponent},
    {path: 'pagina-principal',component: HomeComponent},
    {path: 'fruta',component: FrutaComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'contacto/:page', component: ContactoComponent},// parametro por URL
    {path: 'coches', component: CochesComponent},
    {path: 'plantillas', component: PlantillasComponent},
    {path: '**', component: EmpleadoComponent} // ruta de error, x defecto (si la ruta falla)
];

export const appRoutingProviders: any[ ] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);