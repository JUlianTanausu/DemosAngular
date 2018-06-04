import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { VideojuegosComponent } from './videojuegos/videojuegos.component';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    VideojuegosComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
