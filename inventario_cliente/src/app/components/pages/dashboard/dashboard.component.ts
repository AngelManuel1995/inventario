import { Component } from '@angular/core'
import { DevicesService } from '../../../services/devices.service'

@Component({
    selector:'app-dashboard',
    templateUrl:'./dashboard.component.html'
})

export class DashboardComponent {
    public ver = false
    public allTheSoftware = []
    public allTheSoftwareBuckUp = []
    constructor(public _devicesService:DevicesService){
        this._devicesService.getAllInventary().subscribe((data:any) => {
            this.allTheSoftware = this.getAllSoftware(data)
            this.allTheSoftware.shift()
            this.allTheSoftwareBuckUp = [...this.allTheSoftware]
            this.ver = true
        })
    }


    getAllSoftware({devices}):Array<String> {
        const softwareList = [...devices[0].applications]
        for(let j = 0; j < devices.length; j++){
            for(let i = 0; i < devices[j].applications.length; i++){
               if( !softwareList.includes(devices[j].applications[i]) ){
                    softwareList.push(devices[j].applications[i])
               }
            }
        }

        return softwareList
    }

    filter({value}){
       this.allTheSoftware = this.allTheSoftwareBuckUp.filter((data:String) => {
           return data.toLowerCase().includes(value.toLowerCase())
       }) 
    }

}

