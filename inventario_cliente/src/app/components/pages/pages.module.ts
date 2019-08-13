import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component'
import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DevicesComponent } from '../../components/pages/devices/devices.component'
import { SupliesComponent } from '../../components/pages/suministros/suplies.component'
import { AddUserComponent } from '../../components/pages/admin/adduser.component'
import { UserComponent } from '../../components/pages/admin/user.component'
import { UsersComponent } from '../../components/pages/admin/users.component'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DevicesService }  from '../../services/devices.service'
import { KeyPipe } from '../../pipes/keys.pipe'
import { DeviceComponent } from '../../components/pages/devices/device.component'
import { RegistriesComponent } from '../../components/pages/registries/registries.component'
import { CatalogueComponent } from '../pages/catalogue/catalogue.component' 
import { ServicesModule } from '../../services/services.module'
import { PrepareRegistryComponent } from './registries/prepape-registry/prepare-registry.component'
import { ChartsModule } from 'ng2-charts';
import { RegistryChartComponent } from '../pages/dashboard/charts/registry-chart.component'
import { TrackingDeviceComponent } from '../pages/devices/tracking/tracking-device.component'
import { SupplyComponent }  from '../pages/suministros/supply/supply.component'
import { ShowSupplyComponent } from '../pages/suministros/show/show-supply.component'
import { DeviceDetailsComponent } from '../../components/pages/devices/details/device-details.component'
import { SoftwarePipe } from '../../pipes/icons.pipe'



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    DevicesComponent,
    SupliesComponent,
    DeviceDetailsComponent,
    AddUserComponent,
    UserComponent,
    UsersComponent,
    KeyPipe,
    SoftwarePipe,
    DeviceComponent,
    RegistriesComponent,
    CatalogueComponent,
    PrepareRegistryComponent,
    RegistryChartComponent,
    TrackingDeviceComponent,
    SupplyComponent,
    ShowSupplyComponent
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    DevicesComponent,
    DeviceDetailsComponent,
    SupliesComponent,
    AddUserComponent,
    UserComponent,
    UsersComponent,
    KeyPipe,
    SoftwarePipe,
    DeviceComponent,
    RegistriesComponent,
    CatalogueComponent,
    PrepareRegistryComponent,
    RegistryChartComponent,
    TrackingDeviceComponent,
    SupplyComponent,
    ShowSupplyComponent
  ],
  imports: [
    BrowserModule,
    ServicesModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    })
  ],
  providers: [
     
  ]
})
export class PagesModule { }
