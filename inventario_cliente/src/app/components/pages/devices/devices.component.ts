import { Component } from '@angular/core'
import { DevicesService } from '../../../services/devices.service'
import { RegistriesService } from '../../../services/index.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
    selector:'app-devices',
    templateUrl:'./devices.component.html'
})

export class DevicesComponent {

    public devices = []
    public buckUpDevices = []
    public devicesToLend = []
    public checkOnes:number = 0
    public message = 'Prestar'
    public discovering = false 
    constructor(public _devicesService:DevicesService, 
                public _router:Router,
                public _registriesService:RegistriesService) {
        this._devicesService.getAll().subscribe((devices) => {
            this.devices = devices
            
            this.devices.forEach((device) => {
                device.checked = false
            })
            this.buckUpDevices =  [...this.devices]
        })
    }


    openFormulario(){
        Swal.fire({
            title: 'Nuevo Equipo',
            html:
            `<div class="row"> 
                <div class="col-md-4"> 
                    <label for="tipo"> <strong> Tipo </strong> </label> 
                </div> 
                <div class="col-md-8"> 
                    <select id="tipo" class="form-control"> 
                    <options> 
                        <option value="">Seleccione el tipo</option> 
                        <option value="PORTÁIL">Portátil</option> 
                        <option value="PC">PC</option> 
                        <option value="SMARTPHONE">Smartphone</option> 
                        <option value="MONITOR">Monitor</option> 
                        <option value="TELÉFONO IP">Teléfono IP</option> 
                        <option value="IMPRESORA">Impresora</option> 
                        <option value="OTRO">Otro</option> 
                    </options> 
                </select>
                </div>` +
            '<div class="col-md-4"> <label for="propiedad"> <strong> Propiedad </strong> </label> </div> <div class="col-md-8"> <input id="propiedad" value="" class="form-control"> </div>' + 
            `<div class="col-md-4"> 
                    <label for="marca"> <strong> Marca </strong> </label> 
            </div> 
            <div class="col-md-8">
                    <select id="marca" class="form-control"> 
                        <options> 
                            <option value="">Seleccione la marca</option> 
                            <option value="DELL">DELL</option> 
                            <option value="HP">HP</option> 
                            <option value="HUAWEI">Huawei</option> 
                            <option value="SAMSUNG">Samsung</option> 
                            <option value="MOTOROLA">Motorola</option> 
                            <option value="IPHONE">Iphone</option> 
                            <option value="CISCO">Cisco</option> 
                            <option value="KYOCERA">Kyocera</option> 
                            <option value="OTRO">Otro</option> 
                        </options> 
                    </select>
            </div>` + 
            `<div class="col-md-4"> 
                    <label for="marca"> <strong> Estado </strong> </label> 
            </div> 
            <div class="col-md-8">
                <select id="estado" class="form-control"> 
                    <options> 
                        <option value="">Seleccione el estado</option> 
                        <option value="ASIGNADO">ASIGNADO</option> 
                        <option value="BODEGA">BODEGA</option> 
                        <option value="RECAMBIO">RECAMBIO</option> 
                        <option value="REPARACIÓN">REPARACIÓN</option> 
                        <option value="GARANTÍA">GARANTÍA</option> 
                        <option value="PRESTAMO">PRESTAMO</option> 
                    </options> 
                </select>
            </div>`+
            '<div class="col-md-4"> <label for="modelo"> <strong> Modelo </strong> </label> </div> <div class="col-md-8"> <input id="modelo" value="" class="form-control"> </div>' + 
            '<div class="col-md-4"> <label for="nombre"> <strong> Nombre </strong> </label> </div> <div class="col-md-8"> <input id="nombre" value="" class="form-control"> </div>' +
            '<div class="col-md-4"> <label for="serial"> <strong> Serial </strong> </label> </div> <div class="col-md-8"> <input id="serial" value="" class="form-control"> </div>' +
            `<div class="col-md-4"> 
                <label for="ciudad"> <strong> Ubicación </strong> </label> 
                </div> 
                <div class="col-md-8"> 
                    <select id="ciudad" class="form-control"> 
                    <options> 
                        <option value="">Seleccione la ubicación</option> 
                        <option value="MEDELLÍN">Medellín</option> 
                        <option value="BURITICÁ">Buriticá</option> 
                    </options> 
                </select>
                </div>` + 
          '<div class="col-md-4"> <label for="prestamo"> <strong> Para prestar </strong> </label> </div> <div class="col-md-8"> <select id="prestamo" class="form-control"> <options> <option value="true">SI</option> <option value="false">NO</option> </options> </select> </div> </div>',
            focusConfirm: false,
            preConfirm: () => {
                let tipo:any = document.getElementById('tipo')
                let propiedad:any = document.getElementById('propiedad')
                let marca:any = document.getElementById('marca')
                let modelo:any = document.getElementById('modelo')
                let nombre:any = document.getElementById('nombre')
                let serial:any = document.getElementById('serial')
                let ciudad:any = document.getElementById('ciudad')
                let isParaPrestar:any = document.getElementById('prestamo')
                
              return {
                    type: tipo.value,
                    ownership: propiedad.value,
                    brand: marca.value,
                    model: modelo.value,
                    name: nombre.value,
                    serie: serial.value,
                    city: ciudad.value,
                    isToLend: isParaPrestar.value
              }
            }
          }).then((equipo) =>{
              if(equipo.value){
                  
                  this._devicesService.save(equipo).subscribe(equipoGuardado => {
                      this._devicesService.getOne(equipoGuardado).subscribe(equipo => {
                          this.devices.push(equipo)
                      })
                  })  
              }
          })
    }

    openFormularioDiscovery(){
        Swal.fire({
            title: 'Nuevo Equipo',
            html:
              '<div class="row"> <div class="col-md-4"> <label for="ip"> <strong> Direccón Ip </strong> </label> </div> <div class="col-md-8"> <input id="ip" value="" placeholder="10.0.0.1" class="form-control"> </div> </div>' ,
            focusConfirm: false,
            preConfirm: () => {
                let ip:any = document.getElementById('ip')            
                return {
                    ip: ip.value
                }
            }
          }).then((ip:any) =>{
              if(ip.value){
                this.discovering = true
                    this._devicesService.saveDicovery(ip.value.ip).subscribe((device:any) => {
                        if(!device.OK){
                            throw new Error('Error de conexión con la base de datos')
                        }

                        if(!device.edited){
                            this._devicesService.getOne(device.deviceCreated).subscribe(deviceToPush => {
                                this.devices.push(deviceToPush)
                                this.discovering = false
                            }) 
                        }
                        this.discovering = false
                  })  
              }
          })
    }

    showDevice(device){
        this._devicesService.oculto = ''
        this._devicesService.deviceChosen = device
    }

    filterByParams(params){
        this.devicesToLend = []
        this.devices = [...this.buckUpDevices]
        if(params === 'TODOS'){
            this.devices = [...this.buckUpDevices]
        }else if(params === 'actualizados'){
            this.devices = this.devices.filter((device) => {
                return this.getColor(device.lastDiscovery)[2] < 2 
            })
        }else if(params === 'warning'){
            this.devices = this.devices.filter((device) => {
                return this.getColor(device.lastDiscovery)[2] < 15 && this.getColor(device.lastDiscovery)[2] >= 3 
            })
        }else if(params === 'criticos'){
            this.devices = this.devices.filter((device) => {
                return this.getColor(device.lastDiscovery)[2] > 16
            })
        }
        else{
            this.devices = this.devices.filter((device) => {
                return device.state === params
            })
        }
    }

    changePushOrPup(){
        this.getCheckedOnes()
        /*let index = this.verifyInArray(device)

        if(this.devicesToLend.length === 0){
            this.devicesToLend.push(device)
        }else if(index === -1){
            this.devicesToLend.push(device)
        }else{
            this.devicesToLend.splice(index,1)
        }*/

        if(this.checkOnes === 1){
            this.message = `Prestar ${this.checkOnes} dispositivo`
        }else{
            this.message = `Prestar ${this.checkOnes} dispositivos`
        }
    }

    verifyInArray(device){
        return this.devicesToLend.findIndex(({_id}) => {
            return device._id === _id
        })
    }

    makeLentHandle(){
        const devicesToLend = this.devices.filter((device) => device.checked )
        this._registriesService.setDevicesToLent(devicesToLend)
        this._router.navigate(['/registrar'])
    }

    getCheckedOnes(){
        this.checkOnes = 0
        this.devices.forEach((device) => {
            if(device.checked){
                this.checkOnes = this.checkOnes + 1
            }
        })
    }

    filterByAll(event){
        this.devices = this.buckUpDevices.filter((device) => {
            return device.serie.toLowerCase().includes(event.target.value.toLowerCase()) || 
                   device.brand.toLowerCase().includes(event.target.value.toLowerCase()) || 
                   device.ownership.toLowerCase().includes(event.target.value.toLowerCase()) || 
                   device.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
                   device.model.toLowerCase().includes(event.target.value.toLowerCase()) ||
                   device.type.toLowerCase().includes(event.target.value.toLowerCase()) || 
                   device.city.toLowerCase().includes(event.target.value.toLowerCase()) 
        })
    }

    getColor(lastDiscovery){
        let lastDiscoveryDate = new Date(lastDiscovery)
        const today = new Date()
        const daysSinceLastDiscovery = Math.ceil(Math.abs(lastDiscoveryDate.getTime() - today.getTime()) / (1000*60*60*24))
        
        if(daysSinceLastDiscovery < 2){
            return ['success', 'Actual', daysSinceLastDiscovery]
        }else if (daysSinceLastDiscovery < 15) {
            return ['warning', 'Warning', daysSinceLastDiscovery]
        }else {
            return ['danger', 'Critical', daysSinceLastDiscovery]
        }
    }

}


