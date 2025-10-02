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

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Lazily injected, use getter method
  private customerApi: CustomerApi | null = null;
  private sessionApi: SessionApi | null = null;

  private readonly tokenSubject!: BehaviorSubject<string | null>;
  public readonly isAuthenticated!: Observable<boolean>;

  private readonly base = document.querySelector('base')?.getAttribute('href');

  constructor(
    private environmentInjector: EnvironmentInjector,
    private router: Router
  ) {
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.isAuthenticated = this.tokenSubject.pipe(
      map((token) => token != null),
      shareReplay(1)
    );
  }

  private getSessionApi(): SessionApi {
    if (this.sessionApi === null) {
      this.sessionApi = runInInjectionContext(
        this.environmentInjector,
        () => (this.sessionApi = inject(SessionApi))
      );
    }

    return this.sessionApi!;
  }

  private getCustomerApi(): CustomerApi {
    if (this.customerApi === null) {
      this.customerApi = runInInjectionContext(
        this.environmentInjector,
        () => (this.customerApi = inject(CustomerApi))
      );
    }

    return this.customerApi!;
  }

  getApiCredentials(): Configuration {
    return new Configuration({
      credentials: {
        bearerAuth: () => this.tokenSubject.getValue() ?? undefined,
      },
      withCredentials: true,
    });
  }

  login(email: string, password: string): Observable<boolean> {
    return this.getCustomerApi()
      .loginCustomer(email, password)
      .pipe(
        tap({
          next: (token) => this.tokenSubject.next(token),
          error: () => this.tokenSubject.next(null),
        }),
        map((token) => token != null)
      );
  }

  initOAuthFlow() {
    this.getCustomerApi()
      .loginCustomerWithOAuth('http://localhost:4200')
      .subscribe((response) => (document.location = response));
  }

  refresh() {
    this.getSessionApi()
      .refreshSession()
      .subscribe((token) => this.tokenSubject.next(token));
  }

  logout() {
    this.getCustomerApi()
      .logoutCustomer()
      .subscribe(() => this.tokenSubject.next(null));

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
    return this.getCustomerApi()
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
          error: () => this.tokenSubject.next(null),
        }),
        map((token) => token != null)
      );
  }

  getRootUrl() {
    return this.base === '/'
      ? window.location.origin
      : `${window.location.origin}${this.base}`;
  }
}
