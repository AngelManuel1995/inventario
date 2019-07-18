import { Component } from '@angular/core'

@Component({
    selector:'app-pages',
    templateUrl:'./pages.component.html'
})

export class PagesComponent {

    public fecha = new Date()

    constructor(){
        
    }
}