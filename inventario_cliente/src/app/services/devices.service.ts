import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class DevicesService {

    public oculto = 'oculto'
    public mensaje = 'pregunta'
    public deviceChosen = {
        type:'',
        img:'',
        serie:'',
        brand:'',
        model:'',
        name:'',
        operatingSystem:'',
        ramMemory:'',
        hardDisk:'',
        processor:'',
    }

    constructor(private _httpClient:HttpClient){

    }

    getAll(){
        let url = ''
        return this._httpClient.get('http://127.0.0.1:3000/device').pipe( map( data => {
            /*if(!data.OK){
                throw new Error('Error con la conexión')
            }*/
            return data['devices']
        }) )
    }
    getOne(device:any){
        let url = ''
        return this._httpClient.get(`http://127.0.0.1:3000/device/${device._id}`).pipe( map( data => {
            /*if(!data.OK){
                throw new Error('Error con la conexión')
            }*/
            return data['device']
        }) )
    }

    save(device){
        let url = ''
        return this._httpClient.post('http://127.0.0.1:3000/device', device).pipe( map( data => {
            return data
        }))
    }

    saveDicovery(ip){
        let url = ''
        return this._httpClient.post('http://127.0.0.1:3000/device/discovery', { ip } ).pipe( map( data => {
            return data
        }))
    }

    getAllInventary(){
        let url = ''
        return this._httpClient.get('http://127.0.0.1:3000/device/inventory/all' ).pipe( map( data => {
            return data
        }))
    }

    makeLent(){
        alert('Haciendo el prestamos')
    }
}