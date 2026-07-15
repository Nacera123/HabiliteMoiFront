import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienHabilitationFiche } from './lien-habilitation-fiche';

describe('LienHabilitationFiche', () => {
  let component: LienHabilitationFiche;
  let fixture: ComponentFixture<LienHabilitationFiche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienHabilitationFiche],
    }).compileComponents();

    fixture = TestBed.createComponent(LienHabilitationFiche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
