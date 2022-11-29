import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FlaskApiService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };

  //Fetch from Processes API
  public getHeaderData(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/getHeader');
  }
  public getProcsData(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/getProcs');
  }

  //Fetch from Database API
  public getChartData(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:4000/getChartData');
  }

  //Send to Database API
  public postProcsData(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:4000/postProcs', data, this.httpOptions);
  }
  public postHeaderData(data: any): Observable<any> {
    console.log(data);
    return this.http.post('http://127.0.0.1:4000/postHeader', data, this.httpOptions);
  }

}

