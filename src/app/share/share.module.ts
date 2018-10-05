import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

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
    SearchComponent
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    SearchComponent
  ]
})
export class ShareModule { }
