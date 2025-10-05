import { Injectable } from '@angular/core';
import {
  CustomerService as CustomerApi,
  SessionService as SessionApi,
} from '../generated';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

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

  login(email: string, password: string): Observable<boolean> {
    const response = this.customerApi.loginCustomer(email, password);
    return this.handleTokenResponse(response);
  }

  oauth(): Observable<void> {
    return this.customerApi.loginCustomerWithOAuth().pipe(
      tap((response) => (document.location = response)),
      map(() => {})
    );
  }

  logout(): Observable<any> {
    return this.customerApi
      .logoutCustomer()
      .pipe(
        tap(() => this.tokenSubject.next(undefined)),
        tap(() => {
          // TODO: Clean this up
          if (this.router.url.startsWith('/user')) {
            this.router.navigate(['login']);
          }
        })
      );
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
  }): Observable<boolean> {
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
  }

  refreshSession(): Observable<boolean> {
    const response = this.sessionApi.refreshSession();
    return this.handleTokenResponse(response);
  }

  getToken(): string | undefined {
    return this.tokenSubject.getValue();
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
