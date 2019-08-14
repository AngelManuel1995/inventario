import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable()

export class RegistriesService {

    private devicesToLent:Object[] = []

    constructor(private _httpClient:HttpClient){
    }

    makeLent(device){
        let url = ''
        return this._httpClient.post('http://127.0.0.1:3000/registry', {device}).pipe( map( data => {
            return data
        }))
    }

    getAllRegistries(){
        let url = ''
        return this._httpClient.get('http://127.0.0.1:3000/registry').pipe( map( data => {
            return data
        })) 
    }

    getOne(id){
        let url = ''
        return this._httpClient.get(`http://127.0.0.1:3000/registry/${id}`).pipe( map( data => {
            return data
        }))
    }

    getDevicesToLent(){
        return this.devicesToLent
    }

    setDevicesToLent(devices){
        this.devicesToLent = devices
    }
    
    clearDevicesToLent(){
        this.devicesToLent = []
    }

    completeRegistry(registry){
        let url = ''
        return this._httpClient.patch('http://127.0.0.1:3000/registry', {registry}).pipe( map( data => {
            return data
        }))
    }

}