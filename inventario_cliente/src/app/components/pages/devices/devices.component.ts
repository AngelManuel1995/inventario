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
            `<div class="row" class="width: 90%;"> 
                <div class="col-md-5"> 
                    <label for="type"> <strong> Tipo </strong> </label> 
                </div> 
                <div class="col-md-7"> 
                    <select id="type" class="form-control"> 
                    <options> 
                        <option value="">Seleccione el tipo</option> 
                        <option value="PORTÁIL">Portátil</option> 
                        <option value="PC">PC</option> 
                        <option value="SMARTPHONE">Smartphone</option> 
                        <option value="MONITOR">Monitor</option> 
                        <option value="TELÉFONO IP">Teléfono IP</option> 
                        <option value="IMPRESORA">Impresora</option> 
                        <option value="ESCRITORIO">Escritorio</option> 
                        <option value="OTRO">Otro</option> 
                    </options> 
                </select>
                </div>` +
            `<div class="col-md-5"> 
                <label for="brand"><strong>Fabricante</strong> </label> 
            </div> 
            <div class="col-md-7">
                    <select id="brand" class="form-control"> 
                        <options> 
                            <option value="">Seleccione la fabricante</option> 
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
            '<div class="col-md-5"> <label for="model"> <strong> Modelo </strong> </label> </div> <div class="col-md-7"> <input id="model" value="" class="form-control"> </div>' + 
            '<div class="col-md-5"> <label for="licensePlate"> <strong> Placa </strong> </label> </div> <div class="col-md-7"> <input id="licensePlate" value="" class="form-control"> </div>' + 
            '<div class="col-md-5"> <label for="operatingSystem"> <strong> Sistema operativo </strong> </label> </div> <div class="col-md-7"> <input id="operatingSystem" value="" class="form-control"> </div>' + 
            '<div class="col-md-5"> <label for="processor"> <strong> Procesador </strong> </label> </div> <div class="col-md-7"> <input id="processor" value="" class="form-control"> </div>' + 
            '<div class="col-md-5"> <label for="ramMemory"> <strong> Memoria RAM </strong> </label> </div> <div class="col-md-7"> <input id="ramMemory" value="" class="form-control"> </div>' + 
            '<div class="col-md-5"> <label for="hardDisk"> <strong> Disco Duro </strong> </label> </div> <div class="col-md-7"> <input id="hardDisk" value="" class="form-control"> </div>' + 
            '<div class="col-md-5"> <label for="name"> <strong> Nombre equipo </strong> </label> </div> <div class="col-md-7"> <input id="name" value="" class="form-control"> </div>' +
            '<div class="col-md-5"> <label for="serie"> <strong> Serial </strong> </label> </div> <div class="col-md-7"> <input id="serie" value="" class="form-control"> </div>'+
            '<div class="col-md-5"> <label for="cpuConnected"> <strong> CPU Conectada </strong> </label> </div> <div class="col-md-7"> <input id="cpuConnected" value="" class="form-control"> </div>'+
            '<div class="col-md-5"> <label for="typeOfCommunication"> <strong> Tipo Comunicación </strong> </label> </div> <div class="col-md-7"> <input id="typeOfCommunication" value="" class="form-control"> </div>' +
            `<div class="col-md-5"> 
                <label for="state"> <strong> Estado </strong> </label> 
            </div> 
            <div class="col-md-7">
                <select id="state" class="form-control"> 
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
            `<div class="col-md-5"> <label for="userIdCharger"> <strong> Cédula cargar  </strong> </label> </div> <div class="col-md-7"> <input id="userIdCharger" value="" class="form-control"> </div>
            <div class="col-md-5"> <label for="userNameCharger"> <strong> Nombre cargar </strong> </label> </div> <div class="col-md-7"> <input id="userNameCharger" value="" class="form-control"> </div>
            <div class="col-md-5"> <label for="ceco"> <strong> Centro costos  </strong> </label> </div> <div class="col-md-7"> <input id="ceco" value="" class="form-control"> </div>
            <div class="col-md-5"> <label for="userIdAsigned"> <strong> Cédula Asignado  </strong> </label> </div> <div class="col-md-7"> <input id="userIdAsigned" value="" class="form-control"> </div>
            <div class="col-md-5"> <label for="userNameAsigned"> <strong> Nombre Asignado  </strong> </label> </div> <div class="col-md-7"> <input id="userNameAsigned" value="" class="form-control"> </div>
            <div class="col-md-5"> <label for="headquarters"> <strong> Sede </strong> </label> </div> <div class="col-md-7"> <input id="headquarters" value="" class="form-control"> </div>
            <div class="col-md-5"> <label for="flat"> <strong> Piso </strong> </label> </div> <div class="col-md-7"> <input id="flat" value="" class="form-control"> </div>
            <div class="col-md-5"> <label for="area"> <strong> Area </strong> </label> </div> <div class="col-md-7"> <input id="area" value="" class="form-control"> </div>
            <div class="col-md-5"> <label for="location"> <strong> Ubicación </strong> </label> </div> <div class="col-md-7"> <input id="location" value="" class="form-control"> </div>
            `,
            focusConfirm: false,
            preConfirm: () => {
                let type:any = document.getElementById('type')
                let brand:any = document.getElementById('brand')
                let model:any = document.getElementById('model')
                let operatingSystem:any = document.getElementById('operatingSystem')
                let processor:any = document.getElementById('processor')
                let licensePlate:any = document.getElementById('licensePlate')
                let ramMemory:any = document.getElementById('ramMemory')
                let hardDisk:any = document.getElementById('hardDisk')
                let cpuConnected:any = document.getElementById('cpuConnected')
                let typeOfCommunication:any = document.getElementById('typeOfCommunication')
                let name:any = document.getElementById('name')
                let serie:any = document.getElementById('serie')
                let userIdCharger:any = document.getElementById('userIdCharger')
                let userNameCharger:any = document.getElementById('userNameCharger')
                let ceco:any = document.getElementById('ceco')
                let userIdAsigned:any = document.getElementById('userIdAsigned')
                let userNameAsigned:any = document.getElementById('userNameAsigned')
                let headquarters:any = document.getElementById('headquarters')
                let flat:any = document.getElementById('flat')
                let area:any = document.getElementById('area')
                let state:any = document.getElementById('state')
                let location:any = document.getElementById('location')
                
              return {
                    type: type.value,
                    brand: brand.value,
                    model: model.value,
                    name: name.value,
                    serie: serie.value,
                    location: location.value,
                    city: location.value,
                    userIdCharger: userIdCharger.value,
                    userNameCharger: userNameCharger.value,
                    ceco: ceco.value,
                    userIdAsigned: userIdAsigned.value,
                    userNameAsigned: userNameAsigned.value,
                    headquarters: headquarters.value,
                    flat: flat.value,
                    area: area.value,
                    state: state.value,
                    operatingSystem: operatingSystem.value,
                    processor: processor.value,
                    ramMemory: ramMemory.value,
                    hardDisk: hardDisk.value,
                    cpuConnected: cpuConnected.value,
                    typeOfCommunication: typeOfCommunication.value,
                    licensePlate: licensePlate.value,
              }
            }
          }).then((equipo) =>{
              if(equipo.value){
                  
                  this._devicesService.save(equipo).subscribe((equipoGuardado:any) => {
                      this._devicesService.getOne(equipoGuardado.device).subscribe(equipo => {
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
              '<div class="row"> <div class="col-md-5"> <label for="ip"> <strong> Direccón Ip </strong> </label> </div> <div class="col-md-7"> <input id="ip" value="" placeholder="10.0.0.1" class="form-control"> </div> </div>' ,
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


