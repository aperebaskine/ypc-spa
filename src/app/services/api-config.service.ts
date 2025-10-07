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
  private configuration: Configuration;

  constructor(private injector: EnvironmentInjector) {
    this.configuration = new Configuration({
      // TODO: Resolve path dynamically or with config file
      basePath: `${window.location.origin}/ypc-rest-api`,
      credentials: {
        bearerAuth: this.getToken,
      },
      withCredentials: true,
    });
  }

  private getToken = (): string | undefined => {
    if (!this.authService) {
      this.authService = runInInjectionContext(this.injector, () =>
        inject(AuthenticationService)
      );
    }

    return this.authService.getToken();
  };

  getConfiguration = (): Configuration => this.configuration;
}
