import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes'

//PAGES
import { LoginComponent }     from './components/login/login.component'
import { RegisterComponent }  from './components/register/register.component'
import { NopageComponent }    from './components/shared/nopage/nopage.component'
import { PagesComponent }     from './components/pages/pages.component'
//MODULES 
import { PagesModule } from './components/pages/pages.module'
import { DevicesService } from './services/devices.service'

import { LoginService } from './services/shared/login.service'
import { LoginGuard } from './guards/login.guard'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopageComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    HttpClientModule,
  ],
  providers: [
    DevicesService,
    LoginGuard,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
