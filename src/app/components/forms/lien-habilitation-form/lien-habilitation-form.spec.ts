import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienHabilitationForm } from './lien-habilitation-form';

describe('LienHabilitationForm', () => {
  let component: LienHabilitationForm;
  let fixture: ComponentFixture<LienHabilitationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienHabilitationForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LienHabilitationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
