import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { CookieService } from './cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean | undefined;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  async login(username: string, password: string): Promise<Observable<Body>> {
    // Check if the username or password is empty
    if (!username || !password) {
      throw new Error("Empty username or password.");
    }

    // Hash the password with sha256
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await window.crypto.subtle.digest('sha-256', data);
    // Convert the hash to a hexadecimal string
    const hexHash = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    return this.http.post<Body>('http://127.0.0.1:3000/auth',
      { username, password: hexHash }).pipe(shareReplay());
  }
  async receiveJwtToken(username: string, password: string) {
    // Use the existing AuthService instance instead of creating a new one
    const response = await this.login(username, password);
    response.subscribe((response: any) => {
      const jwtToken = response.token;
      const publicKey = response.public_key;
      const expirationDate = response.expiration_date;
      try {
        // Decode the JWT token using the public key
        const decodedToken = jwt_decode(jwtToken, publicKey);
  
        // Set the authentication state to true
        this.isAuthenticated = true;
  
        // Store the user's authentication state in a cookie
        this.cookieService.set('isAuthenticated', 'true', expirationDate);
  
        // Store the decoded JWT token in a cookie
        this.cookieService.set('decodedToken', JSON.stringify(decodedToken), expirationDate);
      } catch (err) {
        // The JWT token is invalid, so the user cannot be authenticated
        this.isAuthenticated = false;
        this.cookieService.delete('isAuthenticated');
        this.cookieService.delete('decodedToken');
      }
    });
  }

}