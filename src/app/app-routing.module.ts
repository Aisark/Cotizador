import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { CotizadorComponent } from './pages/cotizador/cotizador.component';
import { CotizacionesComponent } from './pages/cotizaciones/cotizaciones.component';
import { Page404Component } from '@pages/page404/page404.component';
import { ClienteComponent } from '@pages/clientes/cliente.component';
import { ClientesComponent } from '@pages/clientes/clientes.component';
import { ProductosComponent } from '@pages/productos/productos.component';
import { ProductoComponent } from '@pages/productos/producto/producto.component';

const routes: Routes = [
  { path: 'cotizaciones', component: CotizacionesComponent },
  { path: 'cotizaciones/:id', component: CotizacionesComponent },
  { path: 'cotizador/:id', component: CotizadorComponent },
  { path: 'cotizador/:id/:numero', component: CotizadorComponent },
  { path: 'cliente/:id', component: ClienteComponent },
  { path: 'clientes', component: ClientesComponent },
  {path: 'productos' , component: ProductosComponent},
  {path: 'producto/:name', component: ProductoComponent},
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
