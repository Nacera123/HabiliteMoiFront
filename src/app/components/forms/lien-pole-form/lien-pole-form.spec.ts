import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienPoleForm } from './lien-pole-form';

describe('LienPoleForm', () => {
  let component: LienPoleForm;
  let fixture: ComponentFixture<LienPoleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienPoleForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LienPoleForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
