import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable() export class QueriesServices {
    constructor(private _httpClient:HttpClient){
    }

    getTopTenMostLent(){
        let url = ''
        return this._httpClient.get('http://10.8.100.89:3000/query').pipe( map( data => {
            return data
        })) 
    }
}