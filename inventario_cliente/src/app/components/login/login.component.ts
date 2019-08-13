import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from '../../services/shared/login.service'

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html'
})

export class LoginComponent {

    public user = {
        email:"", 
        password:""
    }
    
    constructor(public _router:Router, public _loginService:LoginService){
        
    }

    makeLogin(){
        this._loginService.login(this.user).subscribe((data:any) => {
            if(!data.OK){
                
            }
            this._loginService.setUserLocalStorage(data)
            this._router.navigate(['/dashboard'])
        })
    }
}