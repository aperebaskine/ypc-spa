import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import {
  AuthenticationService,
  SHOULD_REFRESH,
} from '../services/authentication.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';

export const sessionRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req);

  let authService = inject(AuthenticationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status !== HttpStatusCode.Unauthorized ||
        !req.context.get(SHOULD_REFRESH)
      ) {
        return throwError(() => error);
      }

      return authService.refreshSession().pipe(
        switchMap(() => {
          const newReq = req.clone({
            setHeaders: { Authorization: authService.getAuthHeader()! },
          });
          return next(newReq);
        })
      );
    })
  );
};
