import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable()

export class SuppliesService {

    constructor(private _httpClient:HttpClient){
    }

    getAll(){
        let url = ''
        return this._httpClient.get('http://10.8.100.89:3000/supply').pipe( map( data => {
            return data
        }))
    }

    save(supply){
        const amount = {
            toUse:0,
            lentOnes:0,
            usedOnes:0
        }
        let url = ''
        supply.amount = amount
        return this._httpClient.post('http://10.8.100.89:3000/supply', {supply}).pipe( map( data => {
            return data
        }))  
    }

    rechargeSupplies(suppliesToRecharge, amountToRecharge, type){
        let url = ''
        return this._httpClient.patch('http://10.8.100.89:3000/supply/recharge', {suppliesToRecharge, amountToRecharge, type}).pipe( map( data => {
            return data
        }))   
    }

    getOne(id){
        let url = ''
        return this._httpClient.get(`http://10.8.100.89:3000/supply/${id}`).pipe( map( data => {
            return data
        }))
    }

 

}