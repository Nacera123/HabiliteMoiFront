import { TestBed } from '@angular/core/testing';

import { LienPosteDirectionService } from './lien-poste-direction-service';

describe('LienPosteDirectionService', () => {
  let service: LienPosteDirectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LienPosteDirectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
