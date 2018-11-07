import {Routes,RouterModule} from '@angular/router';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductoComponent } from './productos/producto/producto.component';
import { ProductosComponent } from './productos/productos.component';
import { PagesComponent } from './pages.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { MenuPaquetesComponent } from './menu-paquetes/menu-paquetes.component';

let childrenRoutes: Routes = [ { path: 'cotizaciones', component: CotizacionesComponent },
{ path: 'cotizaciones/:id', component: CotizacionesComponent },
{ path: 'cotizador/:id', component: CotizadorComponent },
{ path: 'cotizador/:id/:numero', component: CotizadorComponent },
{ path: 'cliente/:id', component: ClientesComponent },
{ path: 'clientes', component: ClientesComponent },
{path: 'productos' , component: ProductosComponent},
{path: 'producto/:tipo', component: ProductoComponent},
{path: 'producto/:tipo/:name', component: ProductoComponent},
{path:'menu-paquetes',component:MenuPaquetesComponent},
{path: 'paquetes', component:PaquetesComponent}

];

const Pagesroutes: Routes = [
  {
    path:'',
    component: PagesComponent,
    children: childrenRoutes
  }
   
  ];

export const PagesRoutes = RouterModule.forChild(Pagesroutes);