import { TestBed } from '@angular/core/testing';

import { LibrarySubCriptionService } from './library-sub-cription.service';

describe('LibrarySubCriptionService', () => {
  let service: LibrarySubCriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrarySubCriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
