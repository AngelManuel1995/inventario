import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable()

export class LoginService {

    public user = null
    
    constructor(public _httpClient:HttpClient){
        this.getUserFromLocalStorage()
    }

    login(user){
        let url = ''
        return this._httpClient.post('http://10.8.100.89:3000/device', { user }).pipe( map( data => {
            return data
        }))
    }

    logout(){
        let url = ''
        return this._httpClient.post('http://10.8.100.89:3000/device', {}).pipe( map( data => {
            return data
        })) 
    }

    setUserLocalStorage({user, token}){
       
        const { _id, email, name } =  user 
        const localUser = {
            _id,
            email,
            name
        }
        localStorage.setItem('user-inventario-arus', JSON.stringify(localUser))
        localStorage.setItem('token-inventario-arus', token)
    }

    getUserFromLocalStorage(){
        try {
            const localStorageuSer = JSON.parse(localStorage.getItem('user-inventario-arus'))
            this.user = localStorageuSer
        } catch ( error ) {
            this.user = null
        }
    }

    logoutFront() {
        localStorage.removeItem('user-inventario-arus')
        localStorage.removeItem('token-inventario-arus')
    }    

    isLogged(){
        const token = localStorage.getItem('token-inventario-arus')
        if(token.length > 0){
            return true
        }
    }

}