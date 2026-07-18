import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienDirectionFiche } from './lien-direction-fiche';

describe('LienDirectionFiche', () => {
  let component: LienDirectionFiche;
  let fixture: ComponentFixture<LienDirectionFiche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienDirectionFiche],
    }).compileComponents();

    fixture = TestBed.createComponent(LienDirectionFiche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
