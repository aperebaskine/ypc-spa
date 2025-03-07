import { Injectable } from '@angular/core';
import { Customer, DefaultService } from '../generated';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly userSubject!: BehaviorSubject<Customer | null>;
  public readonly user!: Observable<Customer | null>;

  constructor(
    private defaultService: DefaultService,
    private localStorageService: LocalStorageService
  ) {
    this.userSubject = new BehaviorSubject<Customer | null>(null);
    this.user = this.userSubject.asObservable();
  }

  login(email: string, password: string) {
    this.defaultService.loginCustomer(email, password).subscribe((token) => {
      console.log(token);
      this.localStorageService.set('sessionToken', token);

      this.defaultService.defaultHeaders.set(
        'Authorization',
        `Bearer ${token}`
      );
      this.defaultService.findUserBySessionToken().subscribe((user) => {
        console.log(user);
        this.userSubject.next(user);
      });
    });
    return this.user;
  }

  logout() {}
}
