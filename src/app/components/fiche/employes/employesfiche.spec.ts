import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesFiche } from './employesfiche';

describe('Employes', () => {
  let component: EmployesFiche;
  let fixture: ComponentFixture<EmployesFiche>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployesFiche],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployesFiche);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
