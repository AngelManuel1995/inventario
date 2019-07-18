import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html'
})

export class LoginComponent {
    constructor(public _router:Router){
        
    }

    makeLogin(){
        this._router.navigate(['/dashboard'])
    }
}