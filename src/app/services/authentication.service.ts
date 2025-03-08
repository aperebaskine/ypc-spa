import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { Configuration, DefaultService } from '../generated';
import { BehaviorSubject, connect, map, merge, Observable, share, shareReplay, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  // Lazily injected, use getter method
  private defaultService: DefaultService | null = null;

  private readonly tokenSubject!: BehaviorSubject<string | null>;
  public readonly isAuthenticated!: Observable<boolean>;

  constructor(
    private environmentInjector: EnvironmentInjector,
    private router: Router) {
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.isAuthenticated = this.tokenSubject.pipe(
      map((token) => token != null),
      shareReplay(1)
    );
  }

  private getDefaultService(): DefaultService {
    if (this.defaultService === null) {
      this.defaultService = runInInjectionContext(
        this.environmentInjector,
        () => this.defaultService = inject(DefaultService)
      );
    }

    return this.defaultService!;
  }

  getApiCredentials(): Configuration {
    return new Configuration({
      credentials: {
        "bearerAuth": () => this.tokenSubject.getValue() ?? undefined
      }
    })
  }

  login(email: string, password: string): Observable<boolean> {
    return this.getDefaultService()
      .loginCustomer(email, password)
      .pipe(
        tap({
          next: (token) => this.tokenSubject.next(token),
          error: () => this.tokenSubject.next(null)
        }),
        map((token) => token != null)
      );
  }

  logout() {
    this.tokenSubject.next(null);

    // TODO: Clean this up
    if (this.router.url.startsWith('/user')) {
      this.router.navigate(['login']);
    }
  }

}
