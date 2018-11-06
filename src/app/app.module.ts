import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Modulos
import { ShareModule } from './share/share.module';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '@pipes/pipes.module';
import { ClienteComponent } from './pages/clientes/cliente.component';
import { FormsModule } from '@angular/forms';
import { PagesComponent } from '@pages/pages.component';
import {APP } from './app.routes';
import { PagesRoutes } from '@pages/pages.routes';
import { LoginComponent } from './Pages/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    PagesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    APP,
    PagesRoutes,
    ShareModule,
    PagesModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ClienteComponent]
})
export class AppModule { }
