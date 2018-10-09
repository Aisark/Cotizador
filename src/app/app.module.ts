import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modulos
import { ShareModule } from './share/share.module';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '@pipes/pipes.module';
import { ClienteComponent } from './pages/clientes/cliente.component';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ShareModule,
    PagesModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ClienteComponent]
})
export class AppModule { }
