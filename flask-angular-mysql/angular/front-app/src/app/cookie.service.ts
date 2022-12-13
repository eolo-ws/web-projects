import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  // This method sets a cookie with the specified name, value, and expiration date
  set(name: string, value: string, expirationDate: Date) {
    const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}`;
    document.cookie = cookieValue;
  }

  // This method deletes the cookie with the specified name
  delete(name: string) {
    // Set the cookie's expiration date to a time in the past
    this.set(name, '', new Date(0));
  }
}
