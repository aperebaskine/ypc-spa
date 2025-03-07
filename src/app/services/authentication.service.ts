import { Injectable } from '@angular/core';
import { DefaultService } from '../generated';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly loginStatusSubject!: BehaviorSubject<boolean>;
  public readonly loginStatus!: Observable<boolean>;

  constructor(private defaultService: DefaultService) { 
    this.loginStatusSubject = new BehaviorSubject<boolean>(false);
    this.loginStatus = this.loginStatusSubject.asObservable();
  }

  login(email: string, password: string) {
    this.defaultService.loginCustomer(email, password)
      .subscribe((token) => console.log(token));
  }

  logout() {
    
  }

}
