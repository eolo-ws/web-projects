import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = 'http://127.0.0.1:3000/api/user/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    if (!username || !password) {
      throw new Error("Empty username or password.");
    }
    return this.http.post<Body>(AUTH_API + 'signin', { username, password }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', { username, email, password, }, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  read(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:3000/read');
  }

  delete(username: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:3000/delete', { username });
  }
}
