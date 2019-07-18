import { Component } from '@angular/core'
import { DevicesService } from '../../../services/devices.service'
import Swal from 'sweetalert2'

@Component({
    selector:'app-devices',
    templateUrl:'./devices.component.html'
})

export class DevicesComponent {

    public devices = []

    constructor(public _devicesService:DevicesService) {
        this._devicesService.getAll().subscribe((devices) => {
            this.devices = devices
        })
    }


    openFormulario(){
        Swal.fire({
            title: 'Nuevo Equipo',
            html:
              '<div class="row"> <div class="col-md-3"> <label for="tipo"> <strong> Tipo </strong> </label> </div> <div class="col-md-9"> <input id="tipo" value="Portatil" class="form-control"> </div>' +
              '<div class="col-md-3"> <label for="propiedad"> <strong> Propiedad </strong> </label> </div> <div class="col-md-9"> <input id="propiedad" value="Continental Gold" class="form-control"> </div>' + 
              '<div class="col-md-3"> <label for="marca"> <strong> Marca </strong> </label> </div> <div class="col-md-9"> <input id="marca" value="Lenovo" class="form-control"> </div>' + 
              '<div class="col-md-3"> <label for="modelo"> <strong> Modelo </strong> </label> </div> <div class="col-md-9"> <input id="modelo" value="Lnv-2019" class="form-control"> </div>' + 
              '<div class="col-md-3"> <label for="nombre"> <strong> Nombre </strong> </label> </div> <div class="col-md-9"> <input id="nombre" value="lenovo-10" class="form-control"> </div>' +
              '<div class="col-md-3"> <label for="serial"> <strong> Serial </strong> </label> </div> <div class="col-md-9"> <input id="serial" value="Lnv-s3-r5-t6" class="form-control"> </div>' +
              '<div class="col-md-3"> <label for="ciudad"> <strong> Ciudad </strong> </label> </div> <div class="col-md-9"> <input id="ciudad" value="Medellín" class="form-control"> </div> </div>',
            focusConfirm: false,
            preConfirm: () => {
                let tipo:any = document.getElementById('tipo')
                let propiedad:any = document.getElementById('propiedad')
                let marca:any = document.getElementById('marca')
                let modelo:any = document.getElementById('modelo')
                let nombre:any = document.getElementById('nombre')
                let serial:any = document.getElementById('serial')
                let ciudad:any = document.getElementById('ciudad')
                
              return {
                    type: tipo.value,
                    ownership: propiedad.value,
                    brand: marca.value,
                    model: modelo.value,
                    name: nombre.value,
                    serie: serial.value,
                    city: ciudad.value
              }
            }
          }).then(equipo =>{
              this._devicesService.save(equipo).subscribe(equipoGuardado => {
                  this._devicesService.getOne(equipoGuardado).subscribe(equipo => {
                      this.devices.push(equipo)
                  })
              })
              
          })
    }

    showDevice(device){
        this._devicesService.oculto = ''
        this._devicesService.deviceChosen = device
    }

}