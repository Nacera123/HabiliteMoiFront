import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionFiche } from './direction-fiche';

describe('DirectionFiche', () => {
  let component: DirectionFiche;
  let fixture: ComponentFixture<DirectionFiche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectionFiche],
    }).compileComponents();

    fixture = TestBed.createComponent(DirectionFiche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
