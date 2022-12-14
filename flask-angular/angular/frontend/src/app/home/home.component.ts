import { Component, OnInit } from '@angular/core';
import { FlaskApiService } from '../flask-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cpu: any;
  mem: any;
  procs: any;

  constructor(private flaskApi: FlaskApiService) {}

  ngOnInit(): void {
    this.flaskApi.getHeader().subscribe((data) => {
      console.log(data);
      this.cpu = data[0]['CPU'];
      this.mem = data[0]['MEM'];
      this.procs = data[0]['PROC'];
      console.log(this.cpu);
    });
  }
}
