import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Promise<Observable<Body>> {
    if (!username || !password) {
      throw new Error("Empty username or password.");
    }
    // Hash the password with sha256
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    return window.crypto.subtle.digest('sha-256', data).then(hash => {
      // Convert the hash to a hexadecimal string
      const hexHash = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
      console.log(hexHash);

      // Send the username and hashed password to the Flask API
      return this.http.post<Body>('http://127.0.0.1:3000/auth',
        { username, password: hexHash }).pipe(shareReplay());
    });
  }
}
