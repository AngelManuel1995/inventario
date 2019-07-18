import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { NopageComponent } from './components/shared/nopage/nopage.component'
import { PagesComponent } from './components/pages/pages.component'
import { PAGES_ROUTES } from './components/pages/pages.routes';

const appRoutes:Routes = [
    {
        path:'',
        component: PagesComponent,
        children: PAGES_ROUTES
    },
    { path:'login',      component:LoginComponent},
    { path:'register',   component:RegisterComponent},
    { path:'**',         component:NopageComponent} 
]

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash:true })