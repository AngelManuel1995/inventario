import { NgModule } from '@angular/core'

import { RegistriesService } from './index.service'
import { QueriesServices } from './index.service'
import { SuppliesService } from './index.service'

@NgModule({
    providers:[
        RegistriesService,
        QueriesServices,
        SuppliesService
    ]
})

export class ServicesModule{}
