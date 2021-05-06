import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @ViewChild('Canvas', {static: true}) elemento: ElementRef;

  ngOnInit(): void {

    new Chart(this.elemento.nativeElement, {
      type: 'polarArea',
      data:{
        labels: ['Lunes','Martes','Miércoles','Jueves','Viernes'],
        datasets: [
          {
            data: [85, 72, 86, 81, 84]
          }
        ]
      }
    });

  }

}
