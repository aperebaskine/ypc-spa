import { ChangeDetectorRef, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../../../services/authentication.service';
import { Observable, Observer } from 'rxjs';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  isAuthenticated!: Observable<boolean>;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthenticationService,
    private location: Location
  ) {
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  login() {
    let form = this.loginForm.value;
    this.authService.login(form.email!, form.password!)
      .subscribe({
        error: (error) => {
          console.log("error");
          this.loginForm.reset();
          Object.values(this.loginForm.controls).forEach((control) =>
            control.setErrors({ 'incorrect': true }
            ));
        }
      });
  }

  goBack() {
    this.location.back();
  }

}
