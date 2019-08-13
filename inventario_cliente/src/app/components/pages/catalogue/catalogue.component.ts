import { Component } from "@angular/core";
import { DevicesService } from '../../../services/devices.service'

@Component({
    selector:'app-catalogue',
    templateUrl:'./catalogue.component.html'
})

export class CatalogueComponent {
    public ver = false
    public summary:any
    constructor(public _devicesService:DevicesService){
        this._devicesService.getAllInventary().subscribe((devices:any) => {
            this.summary = this.getSummarySoftware(this.getIndexWithMoreApplications(devices.devices), devices.devices)
            console.log(this.summary[1])
            this.ver = true
        })   
    }

    
    getIndexWithMoreApplications(devices:Array<object>){
        let index = 0
        let max = 0
        devices.forEach((device:any, i) => {
            if(device.applications.length > max){
                max = device.applications.length
                index = i
            }
        })
        return index
    }

    getSummarySoftware(index, devices){
        let higher = devices[index].applications
        let data = [ [], [] ]
        for(let i = 0; i < higher.length; i++){
            data[0][i] = higher[i]
            data[1][i] = 1
        }

        for(let j = 0; j < devices.length; j++){
            const applications = devices[j].applications
            if(index !== j){
               for(let k = 0; k < higher.length; k++){
                    for(let l = 0; l < applications.length; l++){
                        if(data[0][k] === applications[l]){
                            data[1][k] = data[1][k] + 1
                        }
                    }
               } 
            }
        }

        return data
    }
}