import { Component } from "@angular/core";
import { SuppliesService } from '../../../../services/index.service'
import { Router } from '@angular/router'

@Component({
    selector:'app-supply',
    templateUrl:'./supply.component.html'
})

export class SupplyComponent {

    public supply = {
        brand:'',
        supply:'',
        type:'',
        color:'null',
        reference:'',
        amount:0
    }

    public isConsumible = false
    public typeSupply = null
    public supplies = {
        brands:[
            {
                value:'EPSON',
                text:'EPSON'
            },
            {
                value:'SHARP',
                text:'SHARP'
            },
            {
                value:'HP',
                text:'HP'
            },
            {
                value:'GENERICO',
                text:'GENERICO'
            }
        ],
        types:[
            {
                type:'CONSUMIBLE',
                value:'TONER',
                text:'TONER'
            },
            {
                type:'CONSUMIBLE',
                value:'TINTA',
                text:'TINTA'
            },
            {
                type:'REPUESTO',
                value:'TECLADO',
                text:'TECLADO'
            }
        ],
        colors:[
            {
                value:'CIAN',
                text:'CIAN'
            },
            {
                value:'MAGENTA',
                text:'MAGENTA'
            },
            {
                value:'AMARILLO',
                text:'AMARILLO'
            }, {
                value:'NEGRO',
                text:'NEGRO'
            }
        ]
    }

    constructor(public _suppliesService:SuppliesService, public _router:Router){

    }

    showColorList(event){
        let typeSupply = this.supplies.types.find((supply) => supply.value === event.target.value )
        this.typeSupply = typeSupply.type
        this.supply.type = typeSupply.type
        if(typeSupply.type === 'CONSUMIBLE'){
            this.isConsumible = true
        }else {
            this.supply.color = 'NO APLICA'
            this.isConsumible = false
        }
    }

    confirm(){
        this._suppliesService.save(this.supply).subscribe((supplies) => {
            this._router.navigate(['suministros'])
        })
    }
}