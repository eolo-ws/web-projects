import { Component,OnInit } from '@angular/core';
import { FlaskApiService } from '../flask-api.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  cdat: any;
  tdat: any;
  chart = [];
  cpu_data: any[] = [];
  time_data: any[] = [];
  constructor(private flaskApi: FlaskApiService) { }
  ngOnInit(): void {
    this.flaskApi.getData().subscribe((data) => {
      for (let index = 0; index < data.length; index++) {
        this.cdat = data[index]['cpu'];
        this.tdat = data[index]['ts'];
        this.cpu_data.push(this.cdat);
        this.time_data.push(this.tdat);
      }
      console.log(this.time_data);
      console.log(this.cpu_data);
    });
  }
}
