import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LienDirectionForm } from './lien-direction-form';

describe('LienDirectionForm', () => {
  let component: LienDirectionForm;
  let fixture: ComponentFixture<LienDirectionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LienDirectionForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LienDirectionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
