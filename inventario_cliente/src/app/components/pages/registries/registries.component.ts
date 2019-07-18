import { Component } from "@angular/core";
import { RegistriesService } from '../../../services/index.service'

@Component({
    selector:'app-registries-component',
    templateUrl:'./registries.component.html'
})

export class RegistriesComponent {
    public registries = []
    constructor(public _registriesService:RegistriesService){
        this._registriesService.getAllRegistries().subscribe((allRegistries:any) => {
            if(!allRegistries.OK){
                throw new Error('Error al cargar los registros de prestamos')
            }
            this.registries = allRegistries.registries
            this.registries = this.registries.filter((registry) => {
                return registry.feedbackObservations === 'PENDIENTE'
            })
        })
    }

    completeRegistry(registry:any){
        this._registriesService.completeRegistry(registry).subscribe((data:any) => {
            if(!data.OK){
                throw new Error('Error al actualizar el equipo')
            }
            this.registries = this.registries.filter((reg) => {
                return reg.device._id !== data.deviceUpdated._id
            })
        })
    }

    getDaysToReturn(device){
        return Math.ceil((Math.abs(new Date().getTime() - new Date(device.endDate).getTime())) / (1000*3600*24))
    }
}