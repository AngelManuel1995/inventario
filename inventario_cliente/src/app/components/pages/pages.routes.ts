import { DashboardComponent } from '../../components/pages/dashboard/dashboard.component'
import { DevicesComponent } from '../../components/pages/devices/devices.component'
import { SupliesComponent } from '../../components/pages/suministros/suplies.component'
import { UsersComponent } from '../../components/pages/admin/users.component'
import { RegistriesComponent } from './registries/registries.component';
import { PrepareRegistryComponent } from './registries/prepape-registry/prepare-registry.component'
import { TrackingDeviceComponent } from './devices/tracking/tracking-device.component';
import { SupplyComponent } from './suministros/supply/supply.component';
import { ShowSupplyComponent } from './suministros/show/show-supply.component';
import { DeviceDetailsComponent } from '../../components/pages/devices/details/device-details.component' 
import { CatalogueComponent } from '../../components/pages/catalogue/catalogue.component'

export  const PAGES_ROUTES = [
    { path:'dashboard',             component:DashboardComponent },
    { path:'devices',               component:DevicesComponent },
    { path:'devices/:id',           component:TrackingDeviceComponent },
    { path:'devices/details/:id',   component:DeviceDetailsComponent },
    { path:'suministros',           component:SupliesComponent},
    { path:'suministros/ver/:id',   component:ShowSupplyComponent},
    { path:'suministros/nuevo',     component:SupplyComponent},
    { path:'usuarios',              component:UsersComponent},
    { path:'prestamos',             component:RegistriesComponent},
    { path:'catalogo',              component:CatalogueComponent },
    { path:'registrar',             component:PrepareRegistryComponent},
    { path:'', redirectTo:'/dashboard', pathMatch:'full'}
]

