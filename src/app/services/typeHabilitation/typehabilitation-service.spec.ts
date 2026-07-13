import { TestBed } from '@angular/core/testing';

import { TypehabilitationService } from './typehabilitation-service';

describe('TypehabilitationService', () => {
  let service: TypehabilitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypehabilitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
