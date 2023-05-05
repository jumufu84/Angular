import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {


//Este código no funciona porque la inicialización de la variable doughnutChartData se realiza en tiempo de compilación, se puede solicionar con el ngOnChanges, INVESTIGAR

  @Input() title: string = 'No title';
  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = [ 'Nothing', 'Nothing', 'Nothing' ];
  @Input('data') dataR: number[] = [1,1,1];


  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.dataR }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

}
