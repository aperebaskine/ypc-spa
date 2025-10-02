import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { repeatPasswordValidator } from '../../../validators/repeatPasswordValidator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { emailExistsValidator } from '../../../validators/emailExistsValidator';
import { DocumentType } from '../../../generated';
import { Observable } from 'rxjs';
import { DocumentTypeService } from '../../../services/document-type.service';
import { CommonModule, Location } from '@angular/common';
import { passwordValidator } from '../../../validators/passwordValidator';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { LogoComponent } from "../../common/logo/logo.component";

@Component({
  selector: 'app-registration-page',
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    LogoComponent
],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {

  @ViewChild('stepper') stepper!: MatStepper;

  isAuthenticated!: Observable<boolean>;
  error: boolean = false;

  passwordHint = $localize`8-20 characters, at least one uppercase letter, number and special character.`;

  private fb = inject(FormBuilder);

  registrationForm: FormGroup = this.fb.group({
    credentials: this.fb.group(
      {
        email: ['', [Validators.required, Validators.email], [emailExistsValidator()]],
        password: ['', [Validators.required, passwordValidator()]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validators: repeatPasswordValidator()
      }
    ),
    personalData: this.fb.group({
      firstName: ['', Validators.required],
      lastName1: ['', Validators.required],
      lastName2: [''],
      docType: ['', Validators.required],
      docNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })
  })

  docTypes!: Observable<DocumentType[]>

  constructor(
    private docTypeService: DocumentTypeService,
    private authService: AuthenticationService,
    private router: Router,
    private location: Location
  ) {
    this.docTypes = this.docTypeService.findAll();
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  onSubmit() {
    const credentials = this.registrationForm.value.credentials;
    const personalData = this.registrationForm.value.personalData;

    this.authService.register({
      firstName: personalData.firstName,
      lastName1: personalData.lastName1,
      lastName2: personalData.lastName2,
      docType: personalData.docType,
      docNumber: personalData.docNumber,
      phoneNumber: personalData.phoneNumber,
      email: credentials.email,
      password: credentials.password
    }).subscribe({
      error: () => {
        this.error = true;
        this.stepper.reset();
      }
    });
  }

  goBack() {
    if (this.router.lastSuccessfulNavigation?.previousNavigation) {
      this.location.back();
    } else {
      this.router.navigate(['']);
    }
  }

}
