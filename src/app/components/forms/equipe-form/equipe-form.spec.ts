import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeForm } from './equipe-form';

describe('EquipeForm', () => {
  let component: EquipeForm;
  let fixture: ComponentFixture<EquipeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
