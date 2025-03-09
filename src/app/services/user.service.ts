import { Injectable } from '@angular/core';
import { Customer, DefaultService } from '../generated';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userSubject!: BehaviorSubject<Customer | null>;
  public readonly user!: Observable<Customer | null>;

  constructor(
    private defaultService: DefaultService,
    private authService: AuthenticationService
  ) {
    this.userSubject = new BehaviorSubject<Customer | null>(null);
    this.user = this.userSubject.asObservable();

    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.defaultService
          .getAuthenticatedUser()
          .subscribe(
            (user) => this.userSubject.next(user)
          );
      } else {
        this.userSubject.next(null);
      }
    });
  }

  emailExists(email: string) {
    return this.defaultService.emailExists(email)
      .pipe(map((exists) => exists === "true"));
  }

  register(data: {
    firstName: string,
    lastName1: string,
    lastName2?: string,
    docType: string,
    docNumber: string,
    phoneNumber: string,
    email: string,
    password: string
  }) {
    return this.defaultService.registerCustomer(
      data.firstName,
      data.lastName1,
      data.docType,
      data.docNumber,
      data.phoneNumber,
      data.email,
      data.password,
      data.lastName2
    );
  }

}
