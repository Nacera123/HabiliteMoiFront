import { TestBed } from '@angular/core/testing';

import { LienDirectionService } from './lien-direction-service';

describe('LienDirectionService', () => {
  let service: LienDirectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LienDirectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
