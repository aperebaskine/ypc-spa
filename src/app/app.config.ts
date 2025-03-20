import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  MAT_NATIVE_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { Configuration } from './generated';
import { AuthenticationService } from './services/authentication.service';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient(),
    provideNativeDateAdapter(MAT_NATIVE_DATE_FORMATS),
    {
      provide: Configuration,
      useFactory: (authService: AuthenticationService) =>
        authService.getApiCredentials(),
      deps: [AuthenticationService],
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'EUR',
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        floatLabel: 'always'
      }
    }
  ],
};
