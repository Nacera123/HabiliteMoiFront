import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionForm } from './direction-form';

describe('DirectionForm', () => {
  let component: DirectionForm;
  let fixture: ComponentFixture<DirectionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectionForm],
    }).compileComponents();

    fixture = TestBed.createComponent(DirectionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
