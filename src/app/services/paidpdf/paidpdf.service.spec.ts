import { TestBed } from '@angular/core/testing';

import { PaidpdfService } from './paidpdf.service';

describe('PaidpdfService', () => {
  let service: PaidpdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaidpdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
