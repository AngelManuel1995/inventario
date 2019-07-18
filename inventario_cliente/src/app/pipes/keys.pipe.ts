import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'keys',
    pure:false
})

export class KeyPipe implements PipeTransform{
    transform(value:any){
        let keys:any[] = []

        for(let key in value){
            keys.push(key)
        }
        
        return keys
    }
}
