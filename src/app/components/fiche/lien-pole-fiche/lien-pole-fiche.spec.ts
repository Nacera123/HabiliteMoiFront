import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienPoleFiche } from './lien-pole-fiche';

describe('LienPoleFiche', () => {
  let component: LienPoleFiche;
  let fixture: ComponentFixture<LienPoleFiche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienPoleFiche],
    }).compileComponents();

    fixture = TestBed.createComponent(LienPoleFiche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
