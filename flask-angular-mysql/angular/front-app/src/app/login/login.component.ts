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
    console.log(this.form.value.username);
    console.log(this.form.value.password);
    
    
    // Call the authentication service and pass it the form data
    const loginObservable: Observable<any> = await this.authService.login(this.form.value.username, this.form.value.password);
    // Subscribe to the Observable to handle the response from the Flask API
    loginObservable.subscribe(
      // Handle successful login
      (response: any) => {
        console.log('Login successful: ', response);
      },
      // Handle error
      (error: any) => {
        console.error('Error during login: ', error);
      }
    );
  }

  hide = true;
}
