import { Component } from '@angular/core'
import { QueriesServices } from '../../../services/index.service'

@Component({
    selector:'app-dashboard',
    templateUrl:'./dashboard.component.html'
})

export class DashboardComponent {

    public fecha = new Date()
    public mostLentDevices = []

    constructor(public _queriesServices:QueriesServices){
        this._queriesServices.getTopTenMostLent().subscribe((summary:any) => {
            if(!summary.OK){
                throw new Error('Error al cargar la información del top')
            }
            this.mostLentDevices = summary.summary
        })
    }
}

