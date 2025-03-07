import { Location } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login-page',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthenticationService) {
  }

  login() {
    let form = this.loginForm.value;
    this.authService.login(form.email, form.password);
  }

}
