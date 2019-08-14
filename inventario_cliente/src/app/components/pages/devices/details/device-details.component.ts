import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DevicesService } from '../../../../services/devices.service' 
 
@Component({
    selector:'app-device-details',
    templateUrl:'./device-details.component.html'
})

export class DeviceDetailsComponent {

    public device = null

    constructor(public _activatedRoute:ActivatedRoute, public _devicesService:DevicesService){
        this._activatedRoute.params.subscribe(params => {
            this._devicesService.getOne({_id:params['id']}).subscribe(data => {
                this.device = data
                this.device.applications
            })
        })
    }
} 
