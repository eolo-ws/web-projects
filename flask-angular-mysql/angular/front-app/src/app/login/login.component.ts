import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    // Create an observer object to handle the response from the Flask API
    const observer = {
      next: (response: any) => {
        console.log('Login successful: ', response);
      },
      error: (error: any) => {
        console.error('Error during login: ', error);
      }
    };
    // Call the authentication service and wait for the promise to resolve
    const loginObservable: Observable<any> = await this.authService.login(this.form.value.username, this.form.value.password);
    // Call the receiveJwtToken method to receive the JWT token from the Flask API
    this.authService.receiveJwtToken(this.form.value.username, this.form.value.password);
    // Subscribe to the Observable using the observer object
    loginObservable.subscribe(observer);
  }
  
  

  hide = true;
}
