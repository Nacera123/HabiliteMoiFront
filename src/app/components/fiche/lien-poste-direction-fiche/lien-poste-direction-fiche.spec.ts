import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienPosteDirectionFiche } from './lien-poste-direction-fiche';

describe('LienPosteDirectionFiche', () => {
  let component: LienPosteDirectionFiche;
  let fixture: ComponentFixture<LienPosteDirectionFiche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienPosteDirectionFiche],
    }).compileComponents();

    fixture = TestBed.createComponent(LienPosteDirectionFiche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
