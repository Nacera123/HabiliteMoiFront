import { TestBed } from '@angular/core/testing';

import { LienPoleService } from './lien-pole-service';

describe('LienPoleService', () => {
  let service: LienPoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LienPoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
