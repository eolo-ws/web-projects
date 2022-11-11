import { Injectable } from '@angular/core';
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

  public getHeader(): Observable<any> {
    console.log(this.httpOptions);
    return this.http.get<any>('http://127.0.0.1:5000/header');
  }
  public getProcs(): Observable<any> {
    console.log(this.httpOptions);
    return this.http.get<any>('http://127.0.0.1:5000/procs');
  }
}
