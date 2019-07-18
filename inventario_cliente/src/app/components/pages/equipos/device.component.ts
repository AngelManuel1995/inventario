import { Component } from "@angular/core";
import { DevicesService } from '../../../services/devices.service'

@Component({
    selector:'app-device',
    templateUrl:'./device.component.html',
    styleUrls:['./device.component.css']
})

export class DeviceComponent {
    constructor(public _devicesService:DevicesService){

    }
}