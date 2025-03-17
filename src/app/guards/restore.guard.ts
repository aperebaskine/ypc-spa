import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const restoreGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const queryParams = route.queryParams;

  if (queryParams['restore']) {
    const restore = decodeURIComponent(queryParams['restore']);
    const tree = router.parseUrl(restore);

    return tree;
  }

  return true;
};
