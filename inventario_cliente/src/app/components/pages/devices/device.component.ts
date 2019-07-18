import { Component } from "@angular/core";
import { DevicesService } from '../../../services/devices.service'
import { Router } from '@angular/router'

@Component({
    selector:'app-device',
    templateUrl:'./device.component.html',
    styleUrls:['./device.component.css']
})

export class DeviceComponent {
    constructor(public _devicesService:DevicesService, public _router:Router){

    }

    deviceTracking(deviceToTrack){
        this._devicesService.oculto = 'oculto'
        this._router.navigate(['devices', deviceToTrack._id])
    }
}