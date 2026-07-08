import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GareForm } from './gare-form';

describe('GareForm', () => {
  let component: GareForm;
  let fixture: ComponentFixture<GareForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GareForm],
    }).compileComponents();

    fixture = TestBed.createComponent(GareForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
