import { Component } from "@angular/core";
import { RegistriesService } from '../../../../services/index.service'
import Swal from 'sweetalert2'

@Component({
    selector:'app-prepare-registry',
    templateUrl:'./prepare-registry.component.html'
})

export class PrepareRegistryComponent {

    public devicesToLent = []
    public registries = []
    public registry = {
        startDate:null,
        endDate:null,
        receiver:null,
        ticket:null,
        deliveryObservations:null
    }

    constructor(public _registriesService:RegistriesService ){
        this.devicesToLent = [...this._registriesService.getDevicesToLent()]
        this.registries = this.devicesToLent.map((deviceToLend) =>  deviceToLend = { ...deviceToLend, ...this.registry })
    }

    makeRegistry(device){
        device.lender = '5cf6d59db37411a544fd3b75'
        let message = this.getDaysLent(device) === 1 ? 'día' : 'días'

        Swal.fire({
            title: 'Estás seguro de prestar este equipo!',
            text: `El equipo se prestará por ${this.getDaysLent(device)} ${message}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, prestar este equipo!'
          }).then((result) => {
            if (result.value) {
                this._registriesService.makeLent(device).subscribe((lent:any) => {
                    if(!lent.OK){
                        throw new Error('Error al guardar al hacer el registro del prestamo');
                    }
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'El prestamos se hizo correctamente',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    this.takeOutDeviceSaved(lent.deviceUpdatedToLent._id)
                })
            }
        })
    }

    takeOutDeviceSaved(deviceSaved){
        this.registries = this.registries.filter((registry) => {
            return registry._id !== deviceSaved
        })
    }
    getDaysLent(device){
        return (Math.abs(new Date(device.startDate).getTime() - new Date(device.endDate).getTime())) / (1000*3600*24)
    }
}