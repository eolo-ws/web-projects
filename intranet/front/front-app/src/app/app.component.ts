import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-app';
  user: any;
  constructor() {
    // initialize the user property to null
    this.user = 'null';
  }
}
