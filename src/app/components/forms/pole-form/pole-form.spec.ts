import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoleForm } from './pole-form';

describe('PoleForm', () => {
  let component: PoleForm;
  let fixture: ComponentFixture<PoleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoleForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PoleForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
