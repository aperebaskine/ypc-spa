import { Injectable } from '@angular/core';
import { Configuration } from '../generated';
import { Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  private token: string | undefined = undefined;
  private subscription: Subscription | null = null;

  constructor() {
  }

  setTokenSource(source: Observable<string | undefined>) {
    this.subscription?.unsubscribe();
    this.subscription = source.pipe(tap((token) => this.token = token)).subscribe();
  }

  getConfiguration(): Configuration {
      return new Configuration({
        basePath: `${window.location.origin}/ypc-rest-api`, // TODO: Resolve path dynamically or with config file
        credentials: {
          bearerAuth: () => this.token,
        },
        withCredentials: true,
      });
    }

}
