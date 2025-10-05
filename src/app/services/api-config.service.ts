import {
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
} from '@angular/core';
import { Configuration } from '../generated';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private authService: AuthenticationService | undefined;

  constructor(private injector: EnvironmentInjector) {}

  private getToken(): string | undefined {
    if (!this.authService) {
      this.authService = runInInjectionContext(this.injector, () =>
        inject(AuthenticationService)
      );
    }

    return this.authService.getToken();
  }

  getConfiguration(): Configuration {
    return new Configuration({
      basePath: `${window.location.origin}/ypc-rest-api`, // TODO: Resolve path dynamically or with config file
      credentials: {
        bearerAuth: () => this.getToken(),
      },
      withCredentials: true,
    });
  }
}
