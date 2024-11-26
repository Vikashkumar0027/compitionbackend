import { TestBed } from '@angular/core/testing';

import { PrevoiusPaperService } from './prevoius-paper.service';

describe('PrevoiusPaperService', () => {
  let service: PrevoiusPaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrevoiusPaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
