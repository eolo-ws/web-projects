import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagementComponent } from '../management/management.component';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      level: ['', [Validators.required]],
      password: ['', Validators.required],
      adminPassword: ['', Validators.required]
    });
  }

  onCreate() {
    this.userService.register(this.form.value.username, this.form.value.password, this.form.value.level).subscribe(() => {
      console.log('Posted user data.');
    });
  }

  hide = true;

}
