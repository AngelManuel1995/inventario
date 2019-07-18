import { Component } from "@angular/core"
import { ActivatedRoute } from '@angular/router'
import { SuppliesService } from '../../../../services/index.service'

@Component({
    selector:'app-show-supply',
    templateUrl:'./show-supply.component.html'
})

export class ShowSupplyComponent {
    public idSupplyParams = null
    public supplyRecords = []
    constructor(public _suppliesService:SuppliesService, public _activatedRoute:ActivatedRoute){
        this._activatedRoute.params.subscribe((parametros) => {
            this.idSupplyParams = parametros['id']
            this.getOne(this.idSupplyParams)
        })
    }

    getOne(param){
        this._suppliesService.getOne(param).subscribe((data:any) => {
            this.supplyRecords = data.supplyRecords
            console.log(this.supplyRecords)
        })
    }

}