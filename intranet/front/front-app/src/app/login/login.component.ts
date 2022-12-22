import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private app: AppComponent,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const loginObservable: Observable<any> = this.authService.login(this.form.value.username, this.form.value.password);
    loginObservable.subscribe({
      next: (response: any) => {
        console.log('Login successful: ', response);
        this.app.user = { username: this.form.value.username };
      },
      error: (error: any) => {
        console.error('Error during login: ', error);
      },
      complete: () => {
        console.log('Login complete');
      }
    });
  }


  hide = true;
}
