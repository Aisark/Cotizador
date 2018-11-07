import {Routes, RouterModule} from '@angular/router';
import { PagesComponent } from '@pages/pages.component';
import { Page404Component } from '@pages/page404/page404.component';
import { LoginComponent } from './Pages/login/login.component';

const APP_R: Routes = [
    {
        path:'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: Page404Component 
    },
  
];


export const APP = RouterModule.forRoot(APP_R);