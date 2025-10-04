import {
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
} from '@angular/core';
import {
  Configuration,
  CustomerService as CustomerApi,
  SessionService as SessionApi,
} from '../generated';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly tokenSubject!: BehaviorSubject<string | undefined>;
  public readonly isAuthenticated!: Observable<boolean>;

  constructor(
    private apiConfigService: ApiConfigService,
    private customerApi: CustomerApi,
    private sessionApi: SessionApi,
    private router: Router
  ) {
    this.tokenSubject = new BehaviorSubject<string | undefined>(undefined);
    this.isAuthenticated = this.tokenSubject.pipe(
      map((token) => token != null),
      shareReplay(1)
    );
    this.apiConfigService.setTokenSource(this.tokenSubject.asObservable());
    this.refresh();
  }

  login(email: string, password: string): Observable<boolean> {
    return this.customerApi
      .loginCustomer(email, password)
      .pipe(
        tap({
          next: (token) => this.tokenSubject.next(token),
          error: () => this.tokenSubject.next(undefined),
        }),
        map((token) => token != null)
      );
  }

  initOAuthFlow() {
    this.customerApi
      .loginCustomerWithOAuth()
      .subscribe((response) => (document.location = response));
  }

  refresh() {
    this.sessionApi
      .refreshSession()
      .subscribe((token) => this.tokenSubject.next(token));
  }

  logout() {
    this.customerApi
      .logoutCustomer()
      .subscribe(() => this.tokenSubject.next(undefined));

    // TODO: Clean this up
    if (this.router.url.startsWith('/user')) {
      this.router.navigate(['login']);
    }
  }

  register(data: {
    firstName?: string;
    lastName1?: string;
    lastName2?: string;
    docType?: string;
    docNumber?: string;
    phoneNumber?: string;
    email: string;
    password: string;
  }) {
    return this.customerApi
      .registerCustomer(
        data.email,
        data.password,
        data.firstName,
        data.lastName1,
        data.lastName2,
        data.docType,
        data.docNumber,
        data.phoneNumber
      )
      .pipe(
        tap({
          next: (response) => this.tokenSubject.next(response ?? null),
          error: () => this.tokenSubject.next(undefined),
        }),
        map((token) => token != null)
      );
  }
}
