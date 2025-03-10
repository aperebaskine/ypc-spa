import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { repeatPasswordValidator } from '../../../validators/repeatPasswordValidator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { emailExistsValidator } from '../../../validators/emailExistsValidator';
import { DocumentType } from '../../../generated';
import { Observable } from 'rxjs';
import { DocumentTypeService } from '../../../services/document-type.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { passwordValidator } from '../../../validators/passwordValidator';

@Component({
  selector: 'app-registration-page',
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {

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
    private userService: UserService
  ) {
    this.docTypes = this.docTypeService.findAll();
  }

  onSubmit() {
    const credentials = this.registrationForm.value.credentials;
    const personalData = this.registrationForm.value.personalData;
    this.userService.register({
      firstName: personalData.firstName,
      lastName1: personalData.lastName1,
      lastName2: personalData.lastName2,
      docType: personalData.docType,
      docNumber: personalData.docNumber,
      phoneNumber: personalData.phoneNumber,
      email: credentials.email,
      password: credentials.password
    }).subscribe({
      next: (next) => console.log(next),
      error: (error) => console.log(error)
    });
  }

}
