import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { SuppliesService } from '../../../services/index.service'
import Swal from 'sweetalert2'

@Component({
    selector:'app-suplies',
    templateUrl:'./suplies.component.html'
})

export class SupliesComponent {

    public fecha = new Date()
    public supplies = null
    public buckupSupplies = null
    public message = 'Recargar'
    public message1 = 'Usar'
    public checkOnes:number = 0
    public type = null

    constructor(public _router:Router, public _suppliesService:SuppliesService){
        this._suppliesService.getAll().subscribe((data:any) => {
            this.supplies = data.supplies

            this.supplies.forEach((supply) => {
                supply.checked = false
            })

            this.buckupSupplies = [...this.supplies]
        })
    }

    filterByAll(event){
        this.supplies = this.buckupSupplies.filter((device) => {
            return device.color.toLowerCase().includes(event.target.value.toLowerCase()) ||
                   device.brand.toLowerCase().includes(event.target.value.toLowerCase()) || 
                   device.supply.toLowerCase().includes(event.target.value.toLowerCase()) ||
                   device.type.toLowerCase().includes(event.target.value.toLowerCase()) ||
                   device.reference.toLowerCase().includes(event.target.value.toLowerCase()) 
        })
    }

    addNewSupply(){
        this._router.navigate(['suministros/nuevo'])
    }

    changePushOrPup(){
        this.getCheckedOnes()
        if(this.checkOnes === 1){
            this.message = `Recargar ${this.checkOnes} suministro`
            this.message1 = `Usar ${this.checkOnes} suministro`
        }else{
            this.message = `Recargar ${this.checkOnes} suministros`
            this.message1 = `Usar ${this.checkOnes} suministros`
        }
    }

    getCheckedOnes(){
        this.checkOnes = 0
        this.supplies.forEach((device) => {
            if(device.checked){
                this.checkOnes = this.checkOnes + 1
            }
        })
    }

    summary(supply){
        return parseInt(supply.amount.toUse) + parseInt(supply.amount.lentOnes) + parseInt(supply.amount.usedOnes)
    }

    rechargeSupplies(type){
        this.type = type
        const suppliesToRecharge = this.supplies.filter((device) => device.checked)
        let MessageToForm = suppliesToRecharge.length > 0 ? 'Recargar multiples suministros' : 'Recargar un suministro';
        Swal.fire({
            title: MessageToForm,
            html:
              '<div class="row"> <div class="col-md-4"> <label for="amount"> <strong> Cantidad </strong> </label> </div> <div class="col-md-8"> <input id="amount" type="number" required="true" class="form-control"> </div>' +
              '<div class="col-md-4"> <label for="invoiceNumber"> <strong>Nº de factura </strong> </label> </div> <div class="col-md-8"> <input id="invoiceNumber" class="form-control"> </div> </div>',
            focusConfirm: false,
            preConfirm: () => {
                let amount:any = document.getElementById('amount')
                let invoiceNumber:any = document.getElementById('invoiceNumber')
                
              return {
                    amount: amount.value,
                    invoiceNumber: invoiceNumber.value
              }
            }
        }).then((amountToRecharge) => {
            if(amountToRecharge.value){
                this._suppliesService.rechargeSupplies(suppliesToRecharge, amountToRecharge, this.type).subscribe((suppliesRecharged:any) => {
                    suppliesRecharged.updates.forEach((supplyRecharged) => {
                        for(let i = 0; i < this.supplies.length; i++){
                            if(supplyRecharged._id === this.supplies[i]._id){
                                this.supplies.splice(i,1,supplyRecharged)
                            }
                        }
                    })
                    this.getCheckedOnes()
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Cantidades actualizadas correctamente',
                        showConfirmButton: false,
                        timer: 1000
                    })
                })
            }
        })
    }

    showDetails(supply){
        this._router.navigate(['suministros/ver/', supply._id])
    }
}