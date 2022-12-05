import { Component, OnInit } from '@angular/core';
import { FlaskApiService } from '../flask-api.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  cdat: any;
  tdat: any;
  mdat: any;

  chart: any = [];
  chart2: any = [];

  cpu_data: any[] = [];
  time_data: any[] = [];
  mem_data: any[] = [];


  dates: any[] = [];

  cpu: any;
  mem: any;
  procs: any;
  data: any;
  constructor(private flaskApi: FlaskApiService) { }


  buttonPress(): void {  this.flaskApi.getHeaderData().subscribe((data) => {
    this.cpu = data[0]['CPU'];
    this.mem = data[0]['MEM'];
    this.procs = data[0]['PROC'];
    this.data = data;
    this.flaskApi.postHeaderData(this.data).subscribe(something => {
      console.log('Posted header data.');
    });
  });}



  ngOnInit(): void {
    this.flaskApi.getChartData().subscribe((data) => {
      for (let index = 0; index < data.length; index++) {
        this.cdat = data[index]['cpu'];
        this.mdat = data[index]['mem'];
        this.tdat = data[index]['ts'];
        this.cpu_data.push(this.cdat);
        this.mem_data.push(this.mdat);
        this.time_data.push(this.tdat);
      }

      this.time_data.forEach(element => {
        let jsdate = new Date(element);
        this.dates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
      });

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [
            {
              data: this.cpu_data,
              borderColor: '#3cba9f',
              fill: false,
            }
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                display: true,
                color: "white"
              },
            },
            y: {
              ticks: {
                display: true,
                color: "white"
              },
            },
          },
        },
      });

      this.chart2 = new Chart('canvas2', {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [
            {
              data: this.mem_data,
              borderColor: '#3cba9f',
              fill: false,
            }
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                display: true,
                color: "white"
              },
            },
            y: {
              ticks: {
                display: true,
                color: "white"
              },
            },
          },
        },
      });

    });
  }
}
