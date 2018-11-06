import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
// Componentes
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '@share/search/search.component';
import {LoadingComponent} from '@share/loading/loading.component';
import { ListaComponent } from '@components/lista/lista.component';
import { PaquetesModalComponent } from '@components/paquetes-modal/paquetes-modal.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    SearchComponent,
    LoadingComponent,
    ListaComponent,
    PaquetesModalComponent
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    SearchComponent,
    LoadingComponent,
    ListaComponent,
    PaquetesModalComponent
  ]
})
export class ShareModule { }
