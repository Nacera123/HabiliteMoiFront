import { TestBed } from '@angular/core/testing';

import { LienhabilitationService } from './lienhabilitation-service';

describe('LienhabilitationService', () => {
  let service: LienhabilitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LienhabilitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
