import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoleFiche } from './pole-fiche';

describe('PoleFiche', () => {
  let component: PoleFiche;
  let fixture: ComponentFixture<PoleFiche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoleFiche],
    }).compileComponents();

    fixture = TestBed.createComponent(PoleFiche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
