import { Component, OnInit, Input } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
    selector:'app-registry-chart',
    templateUrl:'./registry-chart.component.html'
})

export class RegistryChartComponent implements OnInit {
    @Input('chartTitle') chartTitle = ''
    @Input('chartInfo') chartInfo:any = null
    public fecha = new Date()

    public barChartOptions: ChartOptions = {
        responsive: true,
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        }
    };

    public barChartLabels = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];
  
    public barChartData: ChartDataSets[] = [
      { data: [], label: 'Prestamos' }
    ];
    constructor(){

    }

    ngOnInit(){
        this.chartInfo.forEach((info) => {
            this.barChartLabels.push(info.info[0].serie)
            this.barChartData[0].data.push(info.count)
        })
        this.barChartData[0].data.push(0)
    }

    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    
    }
  
    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
     
    }
}