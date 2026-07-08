import { TestBed } from '@angular/core/testing';

import { GareService } from './gare-service';

describe('GareService', () => {
  let service: GareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
