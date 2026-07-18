import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienPostePoleForm } from './lien-poste-pole-form';

describe('LienPostePoleForm', () => {
  let component: LienPostePoleForm;
  let fixture: ComponentFixture<LienPostePoleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienPostePoleForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LienPostePoleForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
