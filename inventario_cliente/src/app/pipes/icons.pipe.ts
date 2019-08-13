import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name:'software'
})

export class SoftwarePipe implements PipeTransform{
    
    constructor(){

    }

    transform(value:String, args?:any):any{
        if(value.toLowerCase().includes('7-zip')){
            return '../../../../../assets/images/softwares/7-zip-icono.jpg'
        }else if(value.toLowerCase().includes('mcafee')){
            return '../../../../../assets/images/softwares/mcafee-icon.jpg'
        }else if(value.toLowerCase().includes('docker')){
            return '../../../../../assets/images/softwares/docker-icon.png'
        }else if(value.toLowerCase().includes('git')){
            return '../../../../../assets/images/softwares/git.png'
        }else if(value.toLowerCase().includes('node')){
            return '../../../../../assets/images/softwares/nodejs.png'
        }else if(value.toLowerCase().includes('notepad')){
            return '../../../../../assets/images/softwares/notepad.png'
        }else if(value.toLowerCase().includes('adobe') || value.toLowerCase().includes('pdf')){
            return '../../../../../assets/images/softwares/adobe.png'
        }else if(value.toLowerCase().includes('chrome')){
            return '../../../../../assets/images/softwares/chrome-icon.png'
        }else if(value.toLowerCase().includes('java')){
            return '../../../../../assets/images/softwares/java.png'
        }else if(value.toLowerCase().includes('obs')){
            return '../../../../../assets/images/softwares/obs.png'
        }else if(value.toLowerCase().includes('python')){
            return '../../../../../assets/images/softwares/python.png'
        }else if(value.toLowerCase().includes('robo')){
            return '../../../../../assets/images/softwares/robo3t.png'
        }else if(value.toLowerCase().includes('xampp')){
            return '../../../../../assets/images/softwares/xampp.png'
        }else if(value.toLowerCase().includes('microsoft office')){
            return '../../../../../assets/images/softwares/office-icon.jpg'
        }else if(value.toLowerCase().includes('forticlient')){
            return '../../../../../assets/images/softwares/FortiClient-icon.png'
        }else if(value.toLowerCase().includes('mysql')){
            return '../../../../../assets/images/softwares/mysql-workbench.png'
        }else if(value.toLowerCase().includes('mongodb')){
            return '../../../../../assets/images/softwares/mongo.png'
        }else if(value.toLowerCase().includes('adselfservice')){
            return '../../../../../assets/images/softwares/ADSelfService-icon.png'
        }else{
            return '../../../../../assets/images/softwares/default-icon.png'
        }
    }
}

 



