import { Injectable } from '@angular/core';
import { Customer, DefaultService, Exists } from '../generated';
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

  exists(exists: { email?: string, phoneNumber?: string }) {
    return this.defaultService.exists(exists.email, exists.phoneNumber);
  }

}
