import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent
  ]
})
export class ShareModule { }
