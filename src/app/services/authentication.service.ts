import { Injectable } from '@angular/core';
import {
  CustomerService as CustomerApi,
  SessionService as SessionApi,
} from '../generated';
import { BehaviorSubject, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpContext, HttpContextToken } from '@angular/common/http';

export const REFRESH_SESSION_ON_UNAUTHORIZED = new HttpContextToken<boolean>(() => true);

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly tokenSubject: BehaviorSubject<string | undefined>;
  public readonly isAuthenticated$: Observable<boolean>;

  constructor(
    private customerApi: CustomerApi,
    private sessionApi: SessionApi,
    private router: Router
  ) {
    this.tokenSubject = new BehaviorSubject<string | undefined>(undefined);
    this.isAuthenticated$ = this.tokenSubject
      .asObservable()
      .pipe(map((token) => !!token));
    this.refreshSession().subscribe();
  }

  readonly login: (email: string, password: string) => Observable<boolean> = (
    email,
    password
  ) => {
    const response = this.customerApi.loginCustomer(email, password);
    return this.handleTokenResponse(response);
  };

  readonly oauth: () => Observable<never> = () => {
    return this.customerApi.loginCustomerWithOAuth().pipe(
      switchMap((url) => {
        document.location = url;
        return EMPTY;
      })
    );
  };

  readonly logout: () => Observable<any> = () => {
    return this.customerApi.logoutCustomer().pipe(
      tap(() => this.tokenSubject.next(undefined)),
      tap(() => {
        // TODO: Clean this up
        if (this.router.url.startsWith('/user')) {
          this.router.navigate(['login']);
        }
      })
    );
  };

  readonly register: (data: {
    firstName?: string;
    lastName1?: string;
    lastName2?: string;
    docType?: string;
    docNumber?: string;
    phoneNumber?: string;
    email: string;
    password: string;
  }) => Observable<boolean> = (data) => {
    const response = this.customerApi.registerCustomer(
      data.email,
      data.password,
      data.firstName,
      data.lastName1,
      data.lastName2,
      data.docType,
      data.docNumber,
      data.phoneNumber
    );
    return this.handleTokenResponse(response);
  };

  readonly refreshSession: () => Observable<boolean> = () => {
    const response = this.sessionApi.refreshSession('body', false, {
      context: new HttpContext().set(REFRESH_SESSION_ON_UNAUTHORIZED, false),
    });
    return this.handleTokenResponse(response);
  };

  readonly getToken: () => string | undefined = () => this.tokenSubject.getValue();

  readonly getAuthHeader: () => string | undefined = () => {
    const token = this.tokenSubject.getValue();
    return !!token ? `Bearer ${token}` : undefined;
  }

  private handleTokenResponse(
    response: Observable<string>
  ): Observable<boolean> {
    return response.pipe(
      tap({
        next: (token) => this.tokenSubject.next(token),
        error: () => this.tokenSubject.next(undefined),
      }),
      map((token) => !!token)
    );
  }
}
