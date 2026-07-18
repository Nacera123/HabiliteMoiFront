import { TestBed } from '@angular/core/testing';

import { LienPostePoleService } from './lien-poste-pole-service';

describe('LienPostePoleService', () => {
  let service: LienPostePoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LienPostePoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
