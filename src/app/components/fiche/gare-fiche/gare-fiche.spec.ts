import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GareFiche } from './gare-fiche';

describe('GareFiche', () => {
  let component: GareFiche;
  let fixture: ComponentFixture<GareFiche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GareFiche],
    }).compileComponents();

    fixture = TestBed.createComponent(GareFiche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
