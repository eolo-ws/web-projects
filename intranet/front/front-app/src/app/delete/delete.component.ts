import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      adminPassword: ['', Validators.required]
    });
  }

  onDelete() {
    this.userService.delete(this.form.value.username).subscribe(() => {
      console.log('Posted deleted data.');
    });
  }
  hide = true;

}
