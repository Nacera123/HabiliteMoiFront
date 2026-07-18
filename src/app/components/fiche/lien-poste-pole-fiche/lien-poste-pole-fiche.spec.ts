import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienPostePoleFiche } from './lien-poste-pole-fiche';

describe('LienPostePoleFiche', () => {
  let component: LienPostePoleFiche;
  let fixture: ComponentFixture<LienPostePoleFiche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienPostePoleFiche],
    }).compileComponents();

    fixture = TestBed.createComponent(LienPostePoleFiche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
