import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Postes } from './postes';

describe('Postes', () => {
  let component: Postes;
  let fixture: ComponentFixture<Postes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Postes],
    }).compileComponents();

    fixture = TestBed.createComponent(Postes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
