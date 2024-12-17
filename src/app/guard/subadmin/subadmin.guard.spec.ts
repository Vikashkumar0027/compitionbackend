import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { subadminGuard } from './subadmin.guard';

describe('subadminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => subadminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
