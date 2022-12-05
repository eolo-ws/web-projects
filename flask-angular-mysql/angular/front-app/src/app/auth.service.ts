import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }
  loginAuth(username: string, password: string) {
    console.log(username);
    console.log(password);
    return this.http.post<Body>('http://127.0.0.1:3000/login', { username, password }).pipe(shareReplay()) 
  }
}
