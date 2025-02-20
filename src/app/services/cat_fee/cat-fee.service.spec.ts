import { TestBed } from '@angular/core/testing';

import { CatFeeService } from './cat-fee.service';

describe('CatFeeService', () => {
  let service: CatFeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatFeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
