import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { CotizadorComponent } from './pages/cotizador/cotizador.component';

const routes: Routes = [
  {path: 'cotizador', component: CotizadorComponent },
  {path: '', redirectTo: '/cotizador', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
