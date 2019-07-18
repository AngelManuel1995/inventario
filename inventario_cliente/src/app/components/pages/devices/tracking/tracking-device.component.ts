import { Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { RegistriesService } from '../../../../services/index.service'
import Swal from "sweetalert2";

@Component({
    selector:'app-tracking-device',
    templateUrl:'./tracking-device.component.html'
})

export class TrackingDeviceComponent {
    public registries = null
    public device = null
    constructor(public _activatedRoute:ActivatedRoute, public _registriesService:RegistriesService, public _router:Router){
        this._activatedRoute.params.subscribe((params) => {
            this._registriesService.getOne(params['id']).subscribe((data:any) => {
                if(!data.OK){
                    return Swal.fire({
                        position: 'center',
                        type: 'info',
                        title: 'No hay registros de este equipo',
                        showConfirmButton: false,
                        timer: 1000
                    }).finally(() => {
                        this._router.navigate(['devices'])
                    })
                }
               this.registries = data.registries
               this.device = data.registries[0].device
            })
        })
    }
}