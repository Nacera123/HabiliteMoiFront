import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeHabilitationForm } from './type-habilitation-form';

describe('TypeHabilitationForm', () => {
  let component: TypeHabilitationForm;
  let fixture: ComponentFixture<TypeHabilitationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeHabilitationForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeHabilitationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
