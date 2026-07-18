import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienPosteDirectionForm } from './lien-poste-direction-form';

describe('LienPosteDirectionForm', () => {
  let component: LienPosteDirectionForm;
  let fixture: ComponentFixture<LienPosteDirectionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienPosteDirectionForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LienPosteDirectionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
