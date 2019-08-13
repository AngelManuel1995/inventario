import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { LoginService } from '../services/shared/login.service'
import { Router } from '@angular/router'


@Injectable() export class LoginGuard implements CanActivate{
    constructor( public _loginService:LoginService, private _router:Router){

    }
    canActivate(){
        return true
        // if(this._loginService.isLogged()){
        //      return true
        // }else{
        //      this._router.navigate(['/login'])
        //      return false
        // }
    }

}
