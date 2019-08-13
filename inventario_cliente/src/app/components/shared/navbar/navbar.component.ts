import { Component } from '@angular/core'
import { LoginService } from '../../../services/shared/login.service'
import { Router } from '@angular/router'

@Component({
    selector:'app-navbar',
    templateUrl:'./navbar.component.html'
})

export class NavbarComponent {
    constructor(public _loginService:LoginService, public _router:Router){
        
    }

    logout(){
        this._loginService.logout().subscribe(data => {
            this._loginService.logoutFront()
            this._router.navigate(['/login'])
        })
    }
}