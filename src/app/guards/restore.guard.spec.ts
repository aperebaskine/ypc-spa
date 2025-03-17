import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { restoreGuard } from './restore.guard';

describe('restoreGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => restoreGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
